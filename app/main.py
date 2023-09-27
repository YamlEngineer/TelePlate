# import uvloop
# For Production Env Delete The Comment Part (line 1) (line 22) in this file and add
# uvloop==0.17.0
# To Requirements.txt Too
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
    # uvloop.install()
    main()
