import { Bot, webhookCallback } from "grammy";
import { Hono } from "hono";
import { config } from "./common/config";
import { logger } from "./helpers/logger";
import { initializeBot } from "./initializeBot";

// Init Bot
const bot = initializeBot();

// Handle webhook or polling mode
if (config.botMode === "webhook") {
  logger.info("Starting in webhook mode...");

  // Initialize Hono
  const app = new Hono();

  // Add the webhook callback to the Hono app
  app.post("/telegram-webhook", webhookCallback(bot, "hono"));

  // Start the Hono app using Bun's built-in HTTP server
  Bun.serve({
    fetch: app.fetch,
    port: config.port,
  });

  logger.info(`Server is running on 0.0.0.0:${config.port}`);
} else {
  logger.info("Starting in polling mode...");

  // Start the bot in long-polling mode
  bot.start();
}
