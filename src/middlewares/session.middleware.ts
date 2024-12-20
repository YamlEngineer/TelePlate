import { MemorySessionStorage, type Middleware, session } from 'grammy'
import { Context, SessionData } from '../common/context'

export function sessionMiddleware(): Middleware<Context> {
  return session({
    getSessionKey: (ctx) => ctx.chatId?.toString(),
    storage: new MemorySessionStorage(),
    initial: (): SessionData => {
      return {}
    },
  })
}