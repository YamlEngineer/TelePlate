import { Context } from "../../common/context";

export function startCommand(ctx: Context) {
    return ctx.reply(ctx.t("welcome"));
}