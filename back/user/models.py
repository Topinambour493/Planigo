import mongoengine as me
from attraction.models import Attraction

class User(me.Document):
    PROFILE_CHOICES = ('Local', 'Touriste', 'Professionnel')

    username = me.StringField(required=True, unique=True)
    profile = me.StringField(choices=PROFILE_CHOICES, required=True)
    country = me.StringField(required=True)
    attractions = me.ListField(me.ReferenceField(Attraction))

    def __str__(self):
        return self.username