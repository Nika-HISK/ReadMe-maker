import { Tool } from "@mastra/core/tools";
import { z } from "zod";
import { gh } from "../lib/utils";

export const getFilePaths = new Tool({
  id: "getFilePaths",
  description: "Get all file paths from the GitHub user repository",
  inputSchema: z.object({
    owner: z
      .string()
      .describe(
        "The owner of the repository. As kiknaio in kiknaio/agents-workshop-101"
      ),
    repo: z
      .string()
      .describe(
        "The name of the repository. As agents-workshop-101 in kiknaio/agents-workshop-101"
      ),
    tree_sha: z
      .string()
      .describe("SHA or branch to start listing commits from")
      .default("main"),
  }),
  outputSchema: z.array(z.string()),
  execute: async ({ context }) => {
    const { owner, repo, tree_sha } = context;

    const getTreeResponse = await gh.rest.git.getTree({
      owner,
      repo,
      recursive: "true",
      tree_sha,
    });

    return getTreeResponse.data.tree
      .map((file) => file.path)
      .filter(Boolean) as string[];
  },
});