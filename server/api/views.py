from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ClientSerializer, RequestSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Request

class ClientListCreate(generics.CreateAPIView):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()   
        else:
            print(serializer.errors)


class RequestListCreate(generics.CreateAPIView):
    serializer_class = RequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()   
        else:
            print(serializer.errors)

class RequestDelete(generics.DestroyAPIView):
    serializer_class = RequestSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Request.objects.filter()
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]