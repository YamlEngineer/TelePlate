import type { ErrorHandler } from 'grammy'
import { Context } from '../common/context'

export const errorHandler: ErrorHandler<Context> = (error) => {
  const { ctx } = error

  ctx.logger.error({
    err: error.error
  })
}