from django.urls import path
from .views import (
    user_register, user_login, user_detail, get_users,
    client_list, client_detail,
    request_list, request_detail
)

urlpatterns = [
    path('login', user_login, name='login'),
    path('register', user_register, name='register'),
    path('users', get_users, name='get_users'),
    path('users/<int:id>', user_detail, name='user_detail'),
    path('clients', client_list, name='client_list'),
    path('clients/<int:id>', client_detail, name='client_detail'),
    path('requests', request_list, name='request_list'),
    path('requests/<int:id>', request_detail, name='request_detail'),
]