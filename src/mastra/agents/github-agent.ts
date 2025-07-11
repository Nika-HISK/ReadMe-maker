import { anthropic } from "@ai-sdk/anthropic";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { getFilePaths } from "../tools/getFilePaths";
import { getFileContent } from "../tools/getFileContent";
import { getRepositoryCommits } from "../tools/getRepositoryCommits";
import { generateReadmeFromRepo } from "../tools/generateReadmeFromRepo";

export const githubAgent = new Agent({
  name: "Github Agent",
  instructions:
    "You're a helpful Github assistant that help user to get information about github repositories",
  model: anthropic("claude-3-5-sonnet-20241022"),

  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", 
    }),
  }),
  tools: {getFilePaths, getFileContent, getRepositoryCommits,generateReadmeFromRepo},
});
