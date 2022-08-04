from django.contrib import admin
from django.urls import path, include
from metafetch_api import views


urlpatterns = [
    path('auth/', include("accounts.urls")),


]
