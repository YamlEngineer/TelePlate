from contextvars import ContextVar
import config
import peewee

db_state_default = {
    "closed": None,
    "conn": None,
    "ctx": None,
    "transactions": None,
}
db_state = ContextVar("db_state", default=db_state_default.copy())


class PeeweeConnectionState(peewee._ConnectionState):
    def __init__(self, **kwargs):
        super().__setattr__("_state", db_state)
        super().__init__(**kwargs)

    def __setattr__(self, name, value):
        self._state.get()[name] = value

    def __getattr__(self, name):
        return self._state.get()[name]

peeweeInstance = peewee.PostgresqlDatabase(config.DB_NAME, user=config.DB_USER, password=config.DB_PASS, host=config.DB_HOST, port=config.DB_PORT)
peeweeInstance._state = PeeweeConnectionState()