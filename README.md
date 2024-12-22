<h1 align="center">🤖 Teleplate</h1>

Bot starter template based on [grammY](https://grammy.dev/) bot framework.

## Features

- Scalable structure
- Config loading and validation
- Internationalization, language changing
- Graceful shutdown
- Logger (powered by [pino](https://github.com/pinojs/pino))
- Ultrafast and multi-runtime server (powered by [hono](https://github.com/honojs/hono))
- Ready-to-use deployment setups:
    - [Docker](#docker-dockercom)
- Examples:
    - grammY plugins:
        - [Conversations](#grammy-conversations-grammydevpluginsconversations)
    - Runtimes:
      - [Bun](#bun-bunsh)

## Usage

Follow these steps to set up and run your bot using this template:

1. **Create a New Repository**

    Start by creating a new repository using this template. You can do this by clicking [here](https://github.com/yamlengineer/teleplate/generate).

2. **Environment Variables Setup**

    Create an environment variables file by copying the provided example file:
     ```bash
     cp .env.example .env
     ```
    Open the newly created `.env` file and set the `BOT_TOKEN` environment variable.

3. **Launching the Bot**

    You can run your bot in both development and production modes.

    **Development Mode:**

    Install the required dependencies:
    ```bash
    bun install
    ```
    Start the bot in watch mode (auto-reload when code changes):
    ```bash
    bun run dev
    ```

   **Production Mode:**

    Install only production dependencies:
    ```bash
    bun install --only=prod
    ```

    Set `DEBUG` environment variable to `false` in your `.env` file.

    Start the bot in production mode:
    ```bash
    bun run start:force # skip type checking and start
    # or
    bun start # with type checking (requires development dependencies)
    ```

### List of Available Commands

- `bun run dev` — Start the bot in development mode.

### Directory Structure

```
project-root/
  ├── locales                         # Localization files
  └── src                             # Codes
      ├── common                      # Common Files like Custom Context
      ├── helpers                     # Helper functions
      ├── middlewares                 # Bot middlewares
      ├── modules                     # bot Modules
      │   ├── example                 # Module Name
      │   │   ├── example.module.ts   # Get updates
      │   │   └── example.service.ts  # Answer updates 
      │   ├── somthing                # other modules
      ├── bootstrap.ts                # bot entry point
      └── index.ts                    # Application entry point
```
