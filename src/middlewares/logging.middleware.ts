import { Middleware } from "grammy";
import { Context } from "../common/context";

// Define the middleware
export const updateLoggingMiddleware: Middleware<any> = async (
  ctx: Context,
  next
) => {
  ctx.logger.debug(`Received Update: ${JSON.stringify(ctx.update, null, 2)}`);
  await next(); // Pass control to the next middleware or handler
};

export function handleLogMiddleware(id: string): Middleware<Context> {
  return (ctx, next) => {
    ctx.logger.info({
      msg: `Handle "${id}"`,
    });
    return next();
  };
}
