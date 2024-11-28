from pymongo import MongoClient
from django.conf import settings

# Création de la connexion MongoDB
client = MongoClient(settings.MONGO_URI)

# Sélection de la base de données
db = client[settings.MONGO_DB_NAME]
