import redis
import config


class CacheService:

    def __init__(self):
        self.redis = redis.Redis(
            connection_pool=redis.ConnectionPool(host=config.CACHE_HOST, password=config.CACHE_PASS,
                                                 port=config.CACHE_PORT, db=config.CACHE_DB))
