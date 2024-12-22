import { Bot } from "grammy";
import { config } from "./common/config";
import { Context, createContextConstructor } from "./common/context";
import { homeModule } from "./modules/home/home.module";
import { autoChatAction } from "@grammyjs/auto-chat-action";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
import { hydrate } from "@grammyjs/hydrate";
import { i18n, isMultipleLocales } from "./common/i18n";
import { logger } from "./helpers/logger";
import { updateLoggingMiddleware } from "./middlewares/logging.middleware";
import { sequentialize } from '@grammyjs/runner'
import { unhandledModule } from "./modules/unhandled/unhandled.module";
import { languageModule } from "./modules/language/language.module";
import { sessionMiddleware } from "./middlewares/session.middleware";
import { errorHandler } from "./common/error";

export const initializeBot = () : Bot<Context> => {

  // Exit app if bot token not set
  if (!config.botToken) throw new Error("BOT_TOKEN is not defined");

  // Initialize the bot
  const bot = new Bot<Context>(config.botToken, {
    ContextConstructor: createContextConstructor({ logger, config }),
  });

  // Bot Configs
  bot.api.config.use(parseMode("HTML"));
  const protectedBot = bot.errorBoundary(errorHandler)

  // Use the middleware
  if (config.botMode === "polling") protectedBot.use(sequentialize((ctx) => ctx.chatId?.toString()))
  config.debug && protectedBot.use(updateLoggingMiddleware);
  protectedBot.use(autoChatAction(bot.api));
  protectedBot.use(hydrateReply);
  protectedBot.use(hydrate());
  protectedBot.use(sessionMiddleware());
  protectedBot.use(i18n);

  // Add Modules
  protectedBot.use(homeModule);
  if (isMultipleLocales) protectedBot.use(languageModule)
  protectedBot.use(unhandledModule);

  return bot
  
};
