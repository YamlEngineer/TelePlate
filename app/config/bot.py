from os import environ as env

BOT_SESSION = env.get('BOT_SESSION') or env.get('BOT_NAME')
API_ID = env.get('API_ID')
API_HASH = env.get('API_HASH')
BOT_TOKEN = env.get('BOT_TOKEN')
WORK_DIR = env.get('WORK_DIR') or '/tmp'
ADMIN_ID = env.get('ADMIN_ID')
