from django.contrib import admin
from django.urls import path, include
from .views import ListUsers, CustomAuthToken, User_logout
from . import views

from .views import ChangePasswordView

urlpatterns = [
    path('users/', ListUsers.as_view()),
    path('register/', views.register),
    path('login/', CustomAuthToken.as_view()),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('change-password/',
         ChangePasswordView.as_view(), name='change-password'),
    path('logout/', User_logout),


]
