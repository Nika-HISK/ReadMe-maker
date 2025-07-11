# GitHub README Generator with Mastra 🤖📝

An intelligent GitHub README generator powered by the Mastra framework and Claude AI. This project automatically analyzes GitHub repositories and generates comprehensive, well-structured README.md files by examining code structure, commit history, and project patterns.

## ✨ Features

- **AI-Powered Analysis**: Uses Claude 3.5 Sonnet to intelligently analyze repository structure and content
- **Comprehensive Code Scanning**: Examines TypeScript, JavaScript, Python, Java files and configuration files
- **Commit History Integration**: Incorporates recent commit messages to understand project evolution
- **Agent-Based Architecture**: Built with Mastra framework for robust tool orchestration
- **Memory Persistence**: Maintains conversation context using LibSQL storage
- **Automated Markdown Generation**: Produces clean, properly formatted README files
- **Multi-Tool Integration**: Combines file analysis, content fetching, and commit tracking

## 🖥️ Example Output

The generated README includes:
- Project title with appropriate emoji
- Feature descriptions
- Installation and setup instructions
- Technology stack overview
- Project structure visualization
- Recent commit activity
- Contributing guidelines

## 🚀 How to Run

### 1. Clone the Repository
```bash
git clone https://github.com/Nika-HISK/ReadMe-maker.git
```

### 2. Navigate to Project Directory
```bash
cd ReadMe-maker
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Set Environment Variables
Create a `.env` file in the root directory:
```bash
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GITHUB_TOKEN=your_github_token_here
```

### 5. Run the Application
```bash
npm start
```
### 6. Interact with the Agent
Once running, you can chat with the GitHub agent:
```bash
# Example conversation
You: "Generate a README for facebook/react"
Agent: [Analyzes repository and returns complete README.md content]

You: "Create documentation for microsoft/vscode"
Agent: [Generates comprehensive README for VS Code repository]
```

## 🛠️ Technologies Used

- **Mastra Framework**: Agent orchestration and tool management
- **Claude 3.5 Sonnet**: AI model for intelligent README generation
- **Octokit**: GitHub API client for repository data fetching
- **LibSQL**: Local database for conversation memory
- **Zod**: Runtime type validation and schema definition
- **TypeScript**: Type-safe development environment

## 📁 Project Structure

```
src/
├── mastra/
│   ├── agents/
│   │   └── github-agent.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── tools/
│   │   ├── generateReadmeFromRepo.ts
│   │   ├── getFileContent.ts
│   │   ├── getFilePaths.ts
│   │   └── getRepositoryCommits.ts
│   └── index.ts
```
## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key for Claude access | Yes |
| `GITHUB_TOKEN` | GitHub personal access token for API access | Yes |

### Agent Configuration

The GitHub agent is configured with:
- **Model**: Claude 3.5 Sonnet (claude-3-5-sonnet-20241022)
- **Memory**: LibSQL-based persistent storage
- **Tools**: File analysis, content fetching, commit tracking, README generation

## 🎯 How It Works

1. **Repository Analysis**: The agent scans the target repository structure
2. **Content Extraction**: Fetches important files (TypeScript, JavaScript, Python, Java, configs)
3. **Commit History**: Retrieves recent commit messages for context
4. **AI Processing**: Claude analyzes the gathered data to understand the project
5. **README Generation**: Creates a comprehensive README with proper formatting
6. **Validation**: Ensures markdown formatting is correct and clean

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Prerequisites

- Node.js (v18 or higher)
- Anthropic API key
- GitHub personal access token
- Basic understanding of TypeScript and AI agents

## 🔒 API Keys Setup

### Anthropic API Key
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create an account or sign in
3. Generate an API key
4. Add it to your `.env` file

### GitHub Token
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with repository access permissions
3. Add it to your `.env` file

## 💬 Sample Outputs

### Input
```
Generate a README for vercel/next.js

```

### Output
```markdown
# Next.js ⚡
The React Framework for Production

## ✨ Features
- Zero-config setup
- Automatic code splitting
- Server-side rendering
- Static site generation
- Built-in CSS support

## 🚀 How to Run
### 1. Clone the Repository
git clone https://github.com/vercel/next.js.git

### 2. Navigate to Project Directory
cd next.js

### 3. Install Dependencies
npm install

### 4. Run Development Server
npm run dev

## 🛠️ Technologies Used
- React
- TypeScript
- Webpack
- Babel

## 📁 Project Structure
├── packages/
│   ├── next/
│   └── create-next-app/
├── examples/
├── docs/
└── test/

## 📈 Recent Changes
- feat: add support for React 18
- fix: resolve hydration mismatch
- docs: update getting started guide
```

## 📝 License

MIT License - feel free to use this project for your own README generation needs!

## 🙏 Acknowledgments

- **Mastra Framework**: For providing excellent agent orchestration capabilities
- **Anthropic**: For the powerful Claude AI model
- **GitHub**: For the comprehensive API that makes repository analysis possible

---
