from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Client, Request

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):  
    username = serializers.CharField(max_length=150, validators=[])
    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "role"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "name", "email", "company", "created_at", "updated_at"]

class RequestSerializer(serializers.ModelSerializer):
    client_id = serializers.PrimaryKeyRelatedField(
        source='client',
        queryset=Client.objects.all()
    )

    assigned_users = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.all()
    )

    class Meta:
        model = Request
        fields = ["id", "title", "description", "status", "priority", "client_id", "assigned_users", "created_at", "updated_at"]
    
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["assigned_users"] = [
            {
                "id": str(user.id),
                "username": user.username,
                "email": user.email,
                "role": user.role,
            } for user in instance.assigned_users.all()
        ]
        rep["client"] = ClientSerializer(instance.client).data
        rep.pop("client_id", None)
        return rep