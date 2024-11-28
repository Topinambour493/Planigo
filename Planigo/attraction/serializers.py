from rest_framework import serializers
from .models import Attraction, AttractionImage

class AttractionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttractionImage
        fields = ['id', 'raw_data']


class AttractionSerializer(serializers.ModelSerializer):
    images = AttractionImageSerializer(many=True, read_only=True)

    class Meta:
        model = Attraction
        fields = ['id', 'tripadvisor_id', 'raw_data', 'images']
