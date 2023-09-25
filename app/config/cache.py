from os import environ as env

CACHE_HOST = env.get('REDIS_HOST') or 'localhost'
CACHE_PORT = env.get('REDIS_PORT') or 6379
CACHE_PASS = env.get('REDIS_PASS') or ''
CACHE_DB   = env.get('REDIS_DB') or 0