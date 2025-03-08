from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Client, Request

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "name", "email", "company", "created_at", "updated_at"]

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ["id", "title", "description", "status", "priority", "created_at", "updated_at"]