import { Tool } from "@mastra/core/tools";
import { z } from "zod";
import { getFilePaths } from "./getFilePaths";
import { getFileContent } from "./getFileContent";
import { getRepositoryCommits } from "./getRepositoryCommits";
import { anthropic } from "@ai-sdk/anthropic";
import { gh } from "../lib/utils";
import { generateText } from "ai";

const inputSchema = z.object({
  owner: z.string(),
  repo: z.string(),
});

const outputSchema = z
  .string()
  .describe("The complete README.md content in markdown format");

export const generateReadmeFromRepo = new Tool({
  id: "generateReadmeFromRepo",
  description:
    "Generate and return a complete README.md file in markdown format for a GitHub repository",
  inputSchema,
  outputSchema,

  execute: async ({ context }) => {
    const { owner, repo } = context;

    if (
      !getFilePaths.execute ||
      !getFileContent.execute ||
      !getRepositoryCommits.execute
    ) {
      throw new Error("One or more tools are missing their `execute` method.");
    }

    const repoData = await gh.rest.repos.get({ owner, repo });
    const defaultBranch = repoData.data.default_branch;

    const paths = await getFilePaths.execute({
      context: {
        owner,
        repo,
        tree_sha: defaultBranch,
      },
      runtimeContext: {} as any,
    });

    const importantPaths = paths.filter(
      (p) =>
        p.endsWith(".ts") ||
        p.endsWith(".js") ||
        p.endsWith(".java") ||
        p.endsWith(".py") ||
        p === "package.json" ||
        p === "tsconfig.json"
    );

    const filesContent = await Promise.all(
      importantPaths.slice(0, 10).map(async (path) => {
        const res = await getFileContent.execute!({
          context: { owner, repo, path },
          runtimeContext: {} as any,
        });
        return res.ok
          ? `### \`${path}\`\n\n\`\`\`\n${res.content}\n\`\`\`\n`
          : "";
      })
    );

    const commitsRes = await getRepositoryCommits.execute({
      context: { owner, repo },
      runtimeContext: {} as any,
    });

    const commitsText = commitsRes.ok
      ? commitsRes.commits
          .slice(0, 5)
          .map((c) => `- ${c.message}`)
          .join("\n")
      : "Could not fetch commits.";


    const readmePrompt = `Generate a complete README.md file in markdown format for this repository.

Repository: ${owner}/${repo}

OUTPUT ONLY THE MARKDOWN CONTENT - NO EXPLANATIONS OR WRAPPER TEXT.

Follow this exact format:

# [Project Title] [Emoji]
[Brief description paragraph]

## ✨ Features
- Feature 1
- Feature 2
- Feature 3

## 🖥️ Example Output
\`\`\`
[Example if applicable]
\`\`\`

## 🚀 How to Run
### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/${owner}/${repo}.git
\`\`\`

### 2. Navigate to Project Directory
\`\`\`bash
cd ${repo}
\`\`\`

### 3. [Build Step]
\`\`\`bash
[build commands]
\`\`\`

### 4. [Run Step]
\`\`\`bash
[run commands]
\`\`\`

## 🛠️ Technologies Used
- Technology 1
- Technology 2

## 📁 Project Structure
\`\`\`
[file structure]
\`\`\`

## 📈 Recent Changes
${commitsText}

## 🤝 Contributing
Fork the repository and submit pull requests.

## 📝 License
MIT License

Repository files:
${filesContent.join("\n")}

Generate the markdown content directly without any additional text or explanations.`;

    const model = anthropic("claude-3-5-sonnet-20241022");

    const result = await generateText({
      model,
      messages: [{ role: "user", content: readmePrompt }],
    });

    const rawReadme = result.text?.trim() ?? "";

    const fixPrompt = `The following markdown has formatting issues (especially code blocks that start like \`\`\`cd or \`\`\`make without a newline after the backticks). Please fix ALL broken markdown and return only valid, clean markdown:

${rawReadme}`;

    const validated = await generateText({
      model,
      messages: [{ role: "user", content: fixPrompt }],
    });

    const cleanedReadme = validated.text?.trim() ?? "";

    return cleanedReadme;
  },
});
