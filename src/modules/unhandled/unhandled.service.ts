import { Context } from "../../common/context";

export function unhandledMessages(ctx: Context) {
    return ctx.reply(ctx.t("unhandled"));
}

export function unhandledCallbackQueries(ctx: Context) {
    return ctx.answerCallbackQuery();
}

