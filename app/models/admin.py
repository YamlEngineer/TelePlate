from enum import Enum
from peewee import *
from services import DatabaseService
import config
from services import LoggerService


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


DatabaseService.connect()
DatabaseService.create_tables([Admin], safe=True)
# if DatabaseService.table_exists(Admin) and Admin.select().count() == 0:
#     Admin.addAdmin(
#         chat_id=config.ADMIN_ID,
#         status=AdminStatus.ACTIVE,
#     )
#     LoggerService.info('New admin seeded')
DatabaseService.close()
