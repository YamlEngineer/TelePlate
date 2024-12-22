import { webhookCallback } from "grammy";
import { Hono } from "hono";
import { HTTPException } from 'hono/http-exception';
import { getPath } from 'hono/utils/url';
import { config } from "./common/config";
import { logger } from "./helpers/logger";
import { initializeBot } from "./bootstrap";

// Init Bot
const bot = initializeBot();

// Handle webhook or polling mode
if (config.botMode === "webhook") {
  logger.info("Starting in webhook mode...");

  // Initialize Hono
  const app = new Hono();

  // Error Handling
  app.onError(async (error, c) => {
    if (error instanceof HTTPException) {
      if (error.status < 500) logger.info(error);
      else logger.error(error);

      return error.getResponse();
    }

    // Unexpected error
    logger.error({
      err: error,
      method: c.req.raw.method,
      path: getPath(c.req.raw),
    });
    return c.json(
      {
        error: "Oops! Something went wrong.",
      },
      500
    );
  });

  // Middleware to handle empty request bodies
  app.use(`/${config.webhookURI}`, async (c, next) => {
    const rawBody = await c.req.text();

    if (!rawBody) {
      logger.warn("Received an empty request body");
      return c.text("Empty request body", 400);
    }

    try {
      c.req.parseBody = JSON.parse(rawBody); // Optional if JSON parsing is needed
    } catch (error) {
      logger.warn("Invalid JSON body received");
      return c.text("Invalid JSON body", 400);
    }

    await next();
  });

  // Add the webhook callback to the Hono app
  app.post(
    `/${config.webhookURI}`,
    webhookCallback(bot, "hono", {
      secretToken: config.webhookSecret,
    })
  );

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
