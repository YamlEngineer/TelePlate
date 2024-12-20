# Use the official Bun.js image
FROM oven/bun

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb tsconfig.json ./

# Install dependencies
RUN bun install

# Copy all source code
COPY . .

# Expose the bot's default port (if applicable)
EXPOSE 3000

# Set environment variables (optional)
ENV NODE_ENV=production

# Command to start the bot
CMD ["bun", "src/index.ts"]
