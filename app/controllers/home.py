from pyrogram import types
from models import Admin


class HomeController:

    def __init__(self) -> None:
        self.adminModel = Admin

    async def start(self, ctx: types.Message):
        await ctx.reply('Hello')

    async def startForAdmins(self, ctx: types.Message):
        await ctx.reply('Hello Father')
