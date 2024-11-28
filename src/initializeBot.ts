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

function getSessionKey(ctx: Omit<Context, 'session'>) {
  return ctx.chat?.id.toString()
}

export const initializeBot = () : Bot<Context> => {

  // Exit app if bot token not set
  if (!config.botToken) throw new Error("BOT_TOKEN is not defined");

  // Initialize the bot
  const bot = new Bot<Context>(config.botToken, {
    ContextConstructor: createContextConstructor({ logger, config }),
  });

  // Bot Configs
  bot.api.config.use(parseMode("HTML"));

  // Use the middleware
  if (config.botMode === "polling") bot.use(sequentialize(getSessionKey))
  config.debug && bot.use(updateLoggingMiddleware);
  bot.use(autoChatAction(bot.api));
  bot.use(hydrateReply);
  bot.use(hydrate());
  bot.use(sessionMiddleware({ getSessionKey }));
  bot.use(i18n);

  // Add Modules
  bot.use(homeModule);
  if (isMultipleLocales) bot.use(languageModule)
  bot.use(unhandledModule);

  return bot
  
};
