import asyncio
import uvloop
from pyrogram import Client, idle
from services import LoggerService
import config 

async def main():
    await Client(
        config.BOT_SESSION,
        config.API_ID,
        config.API_HASH,
        bot_token=config.BOT_TOKEN,
        workdir=config.WORK_DIR,
        plugins=dict(root="updates")
    ).start()
    await idle()

if __name__ == '__main__':
    uvloop.install()
    asyncio.run(main())
