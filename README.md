# React Sorcerer Take Home Test

## Overview

This project is a rich-text editor built using **Draft.js** within a ReactJS environment. The editor supports specific formatting shortcuts and saves the content persistently using `localStorage`.

## Features

- **Custom Markdown Formatting**:
  - Typing `#` as the first character in a line and pressing space applies the "Heading" format to the line. The `#` disappears after pressing space.
  - Typing `*` as the first character and pressing space applies "Bold" formatting.
  - Typing `**` and pressing space applies "Red" formatting to the text.
  - Typing `***` and pressing space applies "Underline" formatting.

- **Persistence**:
  - Clicking the **Save** button stores the current editor state in the browser's `localStorage`.
  - Upon refreshing the page, the editor restores the saved content automatically.

## Project Structure

```plaintext
/.
├── src/               # Contains all source code
│   ├── App.tsx        # Main application logic and component
│   └── index.tsx      # Entry point for the React application
├── .codesandbox/      # CodeSandbox-specific configuration files
├── .gitignore         # Ignored files for Git
├── README.md          # Project documentation
├── eslint.config.js   # ESLint configuration for linting
├── index.html         # HTML entry point for the app
├── package.json       # NPM dependencies and project metadata
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.js # TailwindCSS configuration
├── tsconfig*.json     # TypeScript configurations
├── vite.config.ts     # Vite configuration for bundling
```

## Prerequisites

Ensure the following tools are installed on your system:

- **Node.js** (v14+)
- **npm** (v6+) or **yarn**

## Installation and Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/puneet-khatri/React-Sorcerer-Take-Home-Test.git
   cd React-Sorcerer-Take-Home-Test
   ```

2. Install dependencies:
   ```bash
   npm install
   # OR
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # OR
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser to view the editor.

## Usage Instructions

1. **Markdown Shortcuts**:
   - Type `#` at the start of a line and press space to create a heading.
   - Type `*` at the start of a line and press space for bold text.
   - Type `**` at the start of a line and press space for red-colored text.
   - Type `***` at the start of a line and press space to underline text.

2. **Save and Persist**:
   - Click the **Save** button to store the current editor content in `localStorage`.
   - Refresh the page to see the saved content restored.

## Deployment

This project is deployed on CodeSandbox. You can view and interact with the live demo here: [CodeSandbox Link](https://w6qjng-5173.csb.app/).

## Testing Instructions

To test the project:

1. Open the editor in your browser.
2. Type the formatting shortcuts (`#`, `*`, `**`, `***`) and observe the respective styling.
3. Click the **Save** button and refresh the page to verify persistence.

## Technologies Used

- **React.js**: Frontend library
- **Draft.js**: Rich-text editor framework
- **Vite**: Fast development server and bundler
- **TailwindCSS**: Styling framework
- **TypeScript**: Type safety and modern JavaScript features

## Assignment Submission

- CodeSandbox Url: [repository](https://codesandbox.io/p/github/puneet-khatri/React-Sorcerer-Take-Home-Test/main)
- Deployed project: [CodeSandbox Link](https://w6qjng-5173.csb.app/)
