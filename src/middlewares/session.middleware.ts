import { MemorySessionStorage, type Middleware, type SessionOptions, session as createSession } from 'grammy'
import { Context, SessionData } from '../common/context'

export function sessionMiddleware(): Middleware<Context> {
  return createSession({
    getSessionKey: (ctx) => ctx.chatId?.toString(),
    storage: new MemorySessionStorage(),
    initial: (): SessionData => {
      return {}
    },
  })
}