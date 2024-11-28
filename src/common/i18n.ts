import { I18n } from "@grammyjs/i18n";
import { Context } from "./context";
import * as path from "path";

export const i18n = new I18n<Context>({
  defaultLocale: "en",
  directory: path.resolve(process.cwd(), "locales"),
  useSession: true,
  fluentBundleOptions: {
    useIsolating: false,
  },
});

export const isMultipleLocales = i18n.locales.length > 1;
