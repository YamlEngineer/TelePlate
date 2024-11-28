import { createCallbackData } from "callback-data";
import { Context } from "../../common/context";
import { createChangeLanguageKeyboard } from "./language.keyboard";
import { i18n } from "../../common/i18n";

export const changeLanguageData = createCallbackData("language", {
  code: String,
});

export async function selectLanguageCommand(ctx: Context) {
  return ctx.reply(ctx.t("language-select"), {
    reply_markup: await createChangeLanguageKeyboard(ctx),
  });
}

export async function changeLanguage(ctx: Context) {
  const { code: languageCode } = changeLanguageData.unpack(ctx.callbackQuery.data);

  if (i18n.locales.includes(languageCode)) {
    await ctx.i18n.setLocale(languageCode);

    return ctx.editMessageText(ctx.t("language-changed"), {
      reply_markup: await createChangeLanguageKeyboard(ctx),
    });
  }
}
