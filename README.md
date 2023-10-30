# Astro GraphQL Starter

Welcome to the `astro-graphql-starter`! This is a starter kit for those looking to build applications using Astro with GraphQL integration.

## Features

- **Astro**: Build faster websites with less client-side JavaScript.
- **Apollo Client**: State management library for JavaScript that enables you to manage both local and remote data with GraphQL.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.
- **NanoStores**: Simple state management for React.
- **GraphQL Yoga**: A fully-featured GraphQL Server with a focus on easy setup, performance & great developer experience.
- **Vanilla Extract**: Zero-runtime Stylesheets-in-TypeScript.
- **React**: A JavaScript library for building user interfaces.
- **ViTest**: Testing utility for Vite projects.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/alanpcurrie/astro-graphql-starter.git
cd astro-graphql-starter
```

2. Install the dependencies:

```bash
pnpm install
```

---

Certainly. Here's a cohesive section on Docker for your README:

---

## Docker Setup

Running your application with Docker ensures a consistent environment, regardless of where Docker is running. Here's how you can get the app up and running with Docker:

### 1. Build the Docker image

To create a Docker image of your application, use the following command:

```bash
docker build -t astro-node:v1 .
```

This command:

- Uses the `docker build` command to create an image.
- Assigns the tag `astro-node:v1` to the image with the `-t` flag.
- Takes the current directory (`.`) as the build context. Docker looks for the `Dockerfile` in this directory to define how the image should be built.

### 2. Run the Docker container

Once the image is built, you can start a container from that image:

```bash
docker run -p 4321:4321 astro-node:v1
```

This will:

- Start a new container from the `astro-node:v1` image.
- Map port `4321` inside the container to port `4321` on your host machine.

Visit `http://localhost:4321` in your browser to access the app running inside the Docker container.

### 3. Docker Compose (Optional)

If you prefer using Docker Compose, you can leverage the provided `docker-compose.yml` file:

- Build the images and start the services:

```bash
docker-compose up --build
```

To stop the services:

```bash
docker-compose down
```

This method is handy when dealing with multi-container applications.

---

## Available Scripts

- `pnpm dev` or `pnpm start`: Runs the app in development mode.
- `pnpm build`: Builds the app for production.
- `pnpm preview`: Runs a preview of the built production app.
- `pnpm test`: Run the tests using ViTest.

## Dependencies

This project uses various packages to provide a rich development and user experience. Here's an overview of the main dependencies:

- **Astro Core**: `astro`, `@astrojs/node`, `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/ts-plugin`.
- **State Management & Data Fetching**: `@apollo/client`, `graphql`, `graphql-yoga`, `nanostores`, `@nanostores/react`.
- **UI & Styling**: `tailwindcss`, `@vanilla-extract/css`, `@vanilla-extract/vite-plugin`.
- **React & Types**: `react`, `react-dom`, `@types/react`, `@types/react-dom`.
- **Testing**: `vitest`.

## Development Tools

To ensure a consistent codebase and improve developer experience, this project uses:

- **Linting**: `eslint`, `@typescript-eslint/parser`, `eslint-plugin-astro`, `eslint-plugin-jsx-a11y`.
- **Formatting**: `prettier`, `prettier-plugin-astro`.
