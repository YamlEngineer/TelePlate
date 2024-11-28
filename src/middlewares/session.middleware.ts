import { type Middleware, type SessionOptions, session as createSession } from 'grammy'
import { Context, SessionData } from '../common/context'

type Options = Pick<SessionOptions<SessionData, Context>, 'getSessionKey' | 'storage'>

export function sessionMiddleware(options: Options): Middleware<Context> {
  return createSession({
    getSessionKey: options.getSessionKey,
    storage: options.storage,
    initial: () => ({}),
  })
}