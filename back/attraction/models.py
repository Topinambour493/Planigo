# attraction/models.py
import mongoengine as me
import datetime

class AttractionImage(me.EmbeddedDocument):
    raw_data = me.DictField()  # Stocker directement les données JSON des images
    created_at = me.DateTimeField(default=datetime.datetime.utcnow)

    def __str__(self):
        return self.raw_data.get('url', 'Image sans URL')


class Attraction(me.Document):
    raw_data = me.DictField()  # Stocker directement les données JSON de TripAdvisor
    images = me.EmbeddedDocumentListField(AttractionImage)  # Liste d'images intégrées
    created_at = me.DateTimeField(default=datetime.datetime.utcnow)
    updated_at = me.DateTimeField(default=datetime.datetime.utcnow)

    def __str__(self):
        return self.raw_data.get('name', 'Attraction sans nom')
