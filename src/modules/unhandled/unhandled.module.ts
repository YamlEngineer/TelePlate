import { Composer } from "grammy";
import { Context } from "../../common/context";
import { handleLogMiddleware } from "../../middlewares/logging.middleware";
import { unhandledCallbackQueries, unhandledMessages } from "./unhandled.service";

const composer = new Composer<Context>();
const module = composer.chatType("private");

module.on("message", handleLogMiddleware("unhandled-message"), unhandledMessages);
module.on("callback_query", handleLogMiddleware("unhandled-callback-query"), unhandledCallbackQueries);

export { composer as unhandledModule };
