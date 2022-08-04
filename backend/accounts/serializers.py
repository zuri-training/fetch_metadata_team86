from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
import email
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import CustomUser


import sys
from django.core import exceptions
import django.contrib.auth.password_validation as validators

from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class RegisterUserSerializer(serializers.ModelSerializer):
    '''
    This Class Serializer helps validate password, confirms password, email and 
    creates a user account if all condition is met and returns the user object
    created.
    '''
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    # this function is where all validation takes place
    # it is an extenstion of the default Django Model Validation
    def validate(self, data):
         
        # get the password and confirm_password from the data
        password = data.get('password')
        confirm_password = data.get('confirm_password')

         
        errors = dict() 
        try:
            # validate the password and catch the exception
            validators.validate_password(password=password)

            # check if password if same with confirm_password
            if password != confirm_password:
                raise serializers.ValidationError({
                    'password': 'Password does not match'
                })

        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
         
        if errors:
            raise serializers.ValidationError(errors)
          
        return super(RegisterUserSerializer, self).validate(data)
        # return super().validate(attrs)

    def save(self):
        user = CustomUser.objects.create_user(
            username=self.validated_data['username'],
            email = self.validated_data['email']
            # password=check if they match before seting the password
        )
        user.set_password(self.validated_data['password'])

        user.save()

        return user

    class Meta:
        model = CustomUser
        fields = '__all__'


from rest_framework import serializers

class ChangePasswordSerializer(serializers.Serializer):
    model = CustomUser

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate(self, data):
         
        # get the password and new_password from the data
        password = data.get('new_password')

         
        errors = dict() 
        try:
            # validate the password and catch the exception
            validators.validate_password(password=password)

        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
         
        if errors:
            raise serializers.ValidationError(errors)
          
        return super(ChangePasswordSerializer, self).validate(data)
