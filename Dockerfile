# Step 1: Build the application
FROM oven/bun:1 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy dependency definition files to the container
COPY package.json .
COPY bun.lock .

# Install dependencies
RUN bun install --production

# Copy source code
COPY src/ src/

# Run build
RUN bun run build

# Create new image
FROM oven/bun:1 AS runner

# Set the working directory in the container
WORKDIR /app

# Copy artifact from builder
COPY --from=builder /app/dist/index.js /app/index.js

# Expose the port the application will run on
EXPOSE 3000

#Start the BUN server
CMD ["bun", "index.js"]