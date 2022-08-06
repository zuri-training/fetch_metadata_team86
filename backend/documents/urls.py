from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('png/', views.image_meta_extract),
    path('jpg_meta_extract/', views.jpg_meta_extract),
    path('image_meta_extract/', views.image_meta_extract),
    path('get_files/', views.get_files),
    path('delete_file/<int:id>/', views.delete_file),

]
