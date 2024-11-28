export interface Config {
  botToken?: string;
  botMode: string;
  logLevel: string;
  debug: boolean;
  webhookURL?: string;
  webhookSecret?: string;
  port: number;
  botAdmins: number[];
}

export const config : Config = {
  botToken: process.env.BOT_TOKEN,
  botMode: process.env.BOT_MODE || "polling",
  logLevel: process.env.LOG_LEVEL || "info",
  debug: JSON.parse(`${process.env.DEBUG}`) || false,
  webhookURL: process.env.WEBHOOK_URL,
  webhookSecret: process.env.WEBHOOK_URL,
  port: Number(process.env.PORT) || 3000,
  botAdmins: process.env.BOT_ADMINS ? process.env.BOT_ADMINS.split(",").map((id) => Number(id.trim())).filter((id) => !isNaN(id)): []
}