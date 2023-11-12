# Astro Tech Radar

`astro-tech-radar` This project is a tech radar built using Astro, focusing on modern web development practices and simplicity.

## Features

- **Astro**: Utilizes Astro for efficient and fast static site generation.
- **TailwindCSS**: Leverages TailwindCSS for rapid and responsive UI development.
- **Vanilla Extract**: Implements Zero-runtime Stylesheets-in-TypeScript for a powerful CSS-in-JS experience.
- **React**: Uses React for building interactive user interfaces.
- **NanoStores**: Simple and effective state management for React.
- **ViTest**: Efficient testing framework for Vite projects.
- **CLI Tool**: Includes a custom CLI tool to create Architectural Decision Records (ADRs) as MDX files.

## Getting Started

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/alan-p-currie/astro-apollo-starter.git
   cd astro-apollo-starter
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

### Available Scripts

- `pnpm run dev` or `pnpm run start`: Starts the app in development mode.
- `pnpm run build`: Builds the app for production.
- `pnpm run preview`: Serves a preview of the built production app.
- `pnpm run test`: Executes tests using ViTest.
- `pnpm run create:adr`: Creates a new ADR file in the `src/pages/adrs` directory.

### Creating an ADR

To create a new ADR file:

```bash
pnpm run create:adr ADR_FILE_NAME
```

Replace `ADR_FILE_NAME` with the desired name for your ADR file. This command will create an MDX file in the `src/pages/adrs` directory with the current timestamp and predefined ADR headings.

## Project Structure

- `src/`: Contains the source code for the project.
- `src/pages/`: Astro pages, including the ADRs created by the CLI tool.
- `src/components/`: React components used within the project.

## Dependencies

This project uses various packages for development and runtime:

- **Astro & Plugins**: `astro`, `@astrojs/mdx`, `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/ts-plugin`.
- **UI & Styling**: `tailwindcss`, `@vanilla-extract/css`, `@vanilla-extract/recipes`, `@vanilla-extract/sprinkles`, `@vanilla-extract/vite-plugin`.
- **React & Types**: `react`, `react-dom`, `@types/react`, `@types/react-dom`.
- **State Management**: `@nanostores/react`, `@nanostores/logger`, `@nanostores/persistent`.
- **Testing & Other Utilities**: `vitest`, `chalk`, `ts-pattern`, `@visx/*`.

## Development Tools

- **Linting & Formatting**: `eslint`, `@typescript-eslint/parser`, `eslint-plugin-astro`, `eslint-plugin-jsx-a11y`, `prettier`, `prettier-plugin-astro`.
