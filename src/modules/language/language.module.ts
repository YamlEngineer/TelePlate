import { Composer } from 'grammy'
import { Context } from '../../common/context'
import { handleLogMiddleware } from '../../middlewares/logging.middleware'
import { changeLanguageData, changeLanguage, selectLanguageCommand } from './language.service'
import { chatAction } from '@grammyjs/auto-chat-action'

const composer = new Composer<Context>()
const module = composer.chatType('private')

module.command('language', handleLogMiddleware('language-command'), chatAction("typing"), selectLanguageCommand);
module.callbackQuery(changeLanguageData.filter(), handleLogMiddleware("change-language-keyboard"), changeLanguage);

export { composer as languageModule }