from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .serializers import UserSerializer, ClientSerializer, RequestSerializer
from .models import Request, Client, CustomUser
import requests
import os 
import json

ZAPIER_WEBHOOK_URL = os.getenv('ZAPIER_WEBHOOK_URL')

@api_view(['POST'])
@permission_classes([AllowAny])
def user_register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = CustomUser.objects.create_user(
            username=serializer.validated_data["username"],
            email=serializer.validated_data["email"],
            password=serializer.validated_data["password"],
            role=serializer.validated_data["role"]
        )
        return Response({
            "message": "User registered successfully",
            "data": UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successfull",
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
        }, status=status.HTTP_201_CREATED)
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_detail(request, id):
    user = get_object_or_404(CustomUser, pk=id)
    if request.method == "GET":
        serializer = UserSerializer(user)
        return Response({"message": "User data retrieved successfully", "data": serializer.data})
    elif request.method == "PUT":
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User data updated successfully"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)   

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def client_list(request):
    if request.method == "GET":
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        return Response({"message": "Clients data retrieved successfully", "data": serializer.data})
    elif request.method == "POST":
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Client has been created successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def client_detail(request, id):
    client = get_object_or_404(Client, pk=id)
    if request.method == "GET":
        serializer = ClientSerializer(client)
        return Response({"message": "Client data retrieved successfully", "data": serializer.data}, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        serializer = ClientSerializer(client, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Client data updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        client.delete()
        return Response({"message": "Client deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def request_list(request):
    if request.method == "GET":
        requests_list = Request.objects.all()
        serializer = RequestSerializer(requests_list, many=True)
        return Response({"message": "Request data retrieved successfully", "data": serializer.data})
    elif request.method == "POST":
        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            payload = json.dumps(serializer.data, default=str)
            try: 
                requests.post(ZAPIER_WEBHOOK_URL, data=payload, headers={'Content-Type': 'application/json'})
            except Exception as er:
                print("Error sending webhook", er)
            return Response({"message": "Request data has been created successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def request_detail(request, id):
    req_obj = get_object_or_404(Request, pk=id)
    if request.method == "GET":
        serializer = RequestSerializer(req_obj)
        return Response({"message": "Request data retrieved successfully", "data": serializer.data})
    elif request.method == "PUT":
        serializer = RequestSerializer(req_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Request data retrieved successfully"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        req_obj.delete()
        return Response({"message": "Request deleted successfully"}, status=status.HTTP_204_NO_CONTENT)