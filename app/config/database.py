from os import environ as env

DB_HOST = env.get('DB_HOST') or 'localhost'
DB_USER = env.get('DB_USER') or 'postgres'
DB_PASS = env.get('DB_PASS')
DB_NAME = env.get('DB_NAME') or env.get('BOT_NAME')
DB_PORT = env.get('DB_PORT') or 5432
