import { Composer } from "grammy";
import { Context } from "../../common/context";
import { chatAction } from "@grammyjs/auto-chat-action";
import { handleLogMiddleware } from "../../middlewares/logging.middleware";
import { startCommand } from "./home.service";

const composer = new Composer<Context>();
const module = composer.chatType("private");

module.command("start", handleLogMiddleware("start-command"), chatAction("typing"), startCommand);

export { composer as homeModule };
