from pyrogram import Client, filters
from controllers import HomeController
from models import Admin

HomeController = HomeController()


@Client.on_message(filters.command("start") & filters.private)
async def start(bot, ctx):
    await HomeController.start(ctx)


@Client.on_message(filters.command("admin") & filters.private & filters.user(Admin.getActiveAdminsID()))
async def startForAdmins(bot, ctx):
    await HomeController.startForAdmins(ctx)
