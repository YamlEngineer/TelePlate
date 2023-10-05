import asyncio
from pyrogram import Client, idle
# import uvloop
# For Production Env Delete The Comment Part (line 1) (line 22) in this file and add
# uvloop==0.17.0
# To Requirements.txt Too
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
    asyncio.run(main())

    # uvloop.install()
    main()
