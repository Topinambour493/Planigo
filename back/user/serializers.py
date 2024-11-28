# user/serializers.py
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    username = serializers.CharField()
    profile = serializers.CharField()
    country = serializers.CharField()

    def create(self, validated_data):
        """Créer un utilisateur"""
        return User(**validated_data).save()

    def update(self, instance, validated_data):
        """Mettre à jour un utilisateur existant"""
        instance.username = validated_data.get('username', instance.username)
        instance.profile = validated_data.get('profile', instance.profile)
        instance.country = validated_data.get('country', instance.country)
        instance.save()
        return instance
