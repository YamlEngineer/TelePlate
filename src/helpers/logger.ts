import { pino } from "pino";
import { config } from "../common/config";

export const logger = pino({
  level: config.logLevel,
  transport: {
    targets: [
      {
        target: "pino-pretty",
        level: config.logLevel,
        options: {
          ignore: "pid,hostname",
          colorize: true,
          translateTime: true,
        },
      },
    ],
  },
});

export type Logger = typeof logger;
