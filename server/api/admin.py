from django.contrib import admin
from .models import Client, Request

# Register your models here.
admin.site.register(Client)
admin.site.register(Request)