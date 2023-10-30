# ---- Build Stage ----
# Use the official Node.js Alpine image as the build base.
# Alpine is a lightweight Linux distribution, which helps reduce the final image size.
FROM node:20-alpine AS build

# Set the working directory inside the container.
# All subsequent commands will be run from this directory.
WORKDIR /app

# Install the `pnpm` package manager globally.
RUN npm install -g pnpm

# Copy only the dependency definition files.
# This step is separated from copying all files to leverage Docker's caching mechanism.
# Only when these files change will the next steps be executed again.
COPY package.json pnpm-lock.yaml ./

# Install the project dependencies.
# Using the --frozen-lockfile option ensures reproducible builds.
RUN pnpm install --frozen-lockfile

# Copy all other source files into the container.
COPY . .

# Run the build script defined in package.json.
# This compiles/transpiles the application for production use.
RUN pnpm run build

# ---- Runtime Stage ----
FROM node:20-alpine AS runtime

# Set the working directory inside the container.
WORKDIR /app

# Before copying, set up the expected permissions
RUN chown -R node:node /app

# Copy the built application files from the build stage.
# This ensures only the necessary files for running the app are included in the final image.
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules

# Set the application to run as a non-root user for security.
# Change ownership of all files to the 'node' user.
USER node

# Set the default listening address for the application to bind to.
# By using 0.0.0.0, the application will listen on all network interfaces
# inside the container, making it accessible from outside.
ENV HOST=0.0.0.0

# Set the default port the application will listen on.
# Some applications use the PORT environment variable as a way to
# allow external configuration of the listening port.
ENV PORT=4321

# Inform Docker that the container will listen on the specified port at runtime.
EXPOSE 4321

# Command to run the application
CMD ["node", "./dist/server/entry.mjs"]
