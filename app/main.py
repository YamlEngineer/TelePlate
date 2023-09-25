import uvloop
from pyrogram import Client
from services import LoggerService
import config 

def main():
    Client(
        config.BOT_SESSION,
        config.API_ID,
        config.API_HASH,
        bot_token=config.BOT_TOKEN,
        workdir=config.WORK_DIR,
        plugins=dict(root="updates")
    ).run()


if __name__ == '__main__':
    uvloop.install()
    main()
