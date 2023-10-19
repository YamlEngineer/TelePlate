
<p align="center" >
    <img width="612" src="../../2/logo.png" alt="logo">
</p>


# TelePlate : Telegram Bot Template with Pyrogram and Docker

## Introduction

#### This project serves as a template for creating Telegram bots using [Pyrgram](https://github.com/pyrogram/pyrogram) and deploying them via Docker. Our goal is to simplify Telegram bot development and deployment , making it as easy as possible.

## Prerequisites

To use this template, you should have:
- Basic knowledge of Python.
- Familiarity with Docker (a basic understanding is sufficient).

## NOTICE
*``Project Status``*:

Please note that this template is a starting point for Telegram bot development and deployment. It may not cover every possible feature or use case. You are encouraged to extend and customize it to meet your specific requirements.


## Getting Started

1. **Clone the Project**
   - Use the following command to clone the project to your local machine:
     ```sh
     git clone https://github.com/YamlEngineer/TelePlate.git
     cd TelePlate
     cp .env.example > .env
     ```

2. **Environment Configuration**
   - Create a `.env` file in the project root directory from `.env.example`.
   - Fill in the required environment variables as specified in the template.
   - beware that all variable should be fill up .

## Important Notice: File Inclusion

For every new file you add to the following folders (updates, controllers, models, services), it's crucial to include them in the respective `__init__.py` file in the same folder. This ensures that the files are properly recognized and can be used within the project.

Please follow this practice to maintain the project's structure and functionality.


## Project Structure

The project follows an MVC-like structure with the following key components:

- `updates`: This folder manages incoming Telegram updates and acts as a route manager.
```python 
from pyrogram import Client, filters
from controllers import HomeController
from models import Admin

@Client.on_message(filters.command("start") & filters.private)
async def start(bot, ctx):
    await HomeController.start(ctx)
    
@Client.on_message(filters.command("admin") & filters.private & filters.user(Admin.getActiveAdminsID()))
async def startForAdmins(bot, ctx):
    await HomeController.startForAdmins(ctx)

```
- `Controllers`: Contains Controller for handling Process and returning the view in MVC Model 
```python
from pyrogram import types
from models import Admin

class HomeController:

    def __init__(self) -> None:
        self.adminModel = Admin

    async def start(self, ctx: types.Message):
        await ctx.reply('Hello')

    async def startForAdmins(self, ctx: types.Message):
        await ctx.reply('Hello Father')

```
- `models`: Contains modules for handling database using [Peewee](https://github.com/coleifer/peewee) minimal ORM and side processes.
- - for example you can create table Structure and class methods here
```python
from enum import Enum
from peewee import *
from services import DatabaseService

class AdminStatus(Enum):
    def __str__(self):
        return str(self.value)

    ACTIVE = 1
    DE_ACTIVE = 0
    
class Admin(Model):
    id = AutoField(primary_key=True)
    chat_id = IntegerField(unique=True)
    status = CharField(choices=[AdminStatus.ACTIVE, AdminStatus.DE_ACTIVE], default=AdminStatus.ACTIVE)

    @classmethod
    def getActiveAdminsID(cls):
        rows = cls.select().where(cls.status == AdminStatus.ACTIVE)
        ids = []
        for row in rows:
            ids.append(row.chat_id)
        return ids

    class Meta:
        database = DatabaseService
        table_name = 'admins'
```
- - or for example you can Create Your Table Here for The first Time :
```python
from services import DatabaseService

DatabaseService.connect()
DatabaseService.create_tables(['TableName'], safe=True)
```
- `services`: Houses various services such as caching, logging, etc.
- - for example, we provided a logger service for that You Can use it Every Where just by calling it  :
```python
import logging
import os

logger = logging.getLogger()
if not os.environ.get('DEBUG'):
    logger.setLevel(logging.INFO)
else:
    logger.setLevel(logging.DEBUG)
handler = logging.StreamHandler()
handler.setFormatter('Your Format Function Here')
logger.addHandler(handler)
```
- - usage Example :
```python
from services import LoggerService
LoggerService.info('Printing Info ')
```

## Customization

You have the flexibility to customize the project to your needs:
- Modify the Dockerfile and Docker Compose files as per your requirements.
- Tailor the template to fit the specific functionality you want for your bot.

## Contributing

We welcome contributions from other developers:
1. Fork the repository.
2. Create a new branch for your changes.
3. Write your code or make improvements.
4. Submit a pull request for review.

## Version Control

The project's versioning is managed using Git. You can check for updates on the [GitHub repository](https://github.com/YamlEngineer/TelePlate.git).

## Legal
This project is open source, and there are no legal considerations to be aware of.

## License
you can read about it here : [LICENSE](../../2/LICENSE)

## Feedback and Community

We encourage users to provide feedback or report issues on the [GitHub project repository](https://github.com/yourusername/telegram-bot-template). In the future, we may establish a Telegram group or channel for community interaction.

## Conclusion

In conclusion, this template aims to simplify Telegram bot development and deployment, making it accessible to developers with basic Python knowledge. Feel free to explore and customize the template to suit your bot's needs.

## CopyRight

This Project Based On [Pyrogram](https://github.com/pyrogram/pyrogram) 