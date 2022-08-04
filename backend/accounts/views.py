# django modules , class and methods
from django.shortcuts import render
from django.contrib.auth import authenticate, logout
from django.core.mail import send_mail
from django.core.mail import EmailMessage

# django rest framework modules , class and methods
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import serializers, generics, status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
import datetime
import pytz

# custom modules, class and methods
# from .models import userProfile
from .serializers import RegisterUserSerializer
from .models import CustomUser

from .serializers import ChangePasswordSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class ListUsers(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        usernames = [user.username for user in CustomUser.objects.all()]
        return Response(usernames)


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        credentials = request.data or request.query_params
        serializer = self.serializer_class(data=credentials,
                                           context={'request': request})

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user.last_login = datetime.datetime.now(pytz.utc)
        user.save(update_fields=['last_login'])


        # SEND Credentials to user
        send_mail(
            # title:
            "Account Credentials for {title} Account".format(title= f"{user.email}"),
            # message:
            f"Email: {user.email}, Password: {serializer.validated_data['password']}",
            # from:
            "pycodet1@gmail.com",
            # to:
            [user.email],
            # fail silently
                fail_silently=False
        )

        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'code': 200,
            'data': [{
                "user_id": user.pk,
                'token': token.key,
                'username': user.username,
                'firt_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'last_login': user.last_login,
            }]
        })

        
@api_view(['POST'])
def register(request):

    credentials = request.data or request.query_params

    # go on to register the user
    serializer = RegisterUserSerializer(data=credentials)
    if serializer.is_valid():
        serializer.save()

        # get the validated username and password to authenticate user immediatly

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        email = serializer.validated_data['email']

        # create if credetials matches any
        user = authenticate(username=email,
                            password=password)

        user.last_login = datetime.datetime.now(pytz.utc)
        user.save(update_fields=['last_login'])
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'code': 200,
            'data': [{
                "user_id": user.pk,
                'token': token.key,
                'username': user.username,
                'firt_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'last_login': user.last_login,
            }]
        }, status.HTTP_200_OK)
    else:
        # raise validations error
        raise serializers.ValidationError(
            serializer.errors
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def User_logout(request):

    request.user.auth_token.delete()

    logout(request)

    return Response({
        'detail': 'User Logged out successfully'
    }, status.HTTP_200_OK)


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = CustomUser
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()

        data = request.data or request.query_params
        serializer = self.get_serializer(data=data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
