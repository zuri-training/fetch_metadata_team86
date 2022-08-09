
from rest_framework import serializers
from .models import Files


from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response

class DocumentSerializer(serializers.ModelSerializer):
    '''
    This Class Serializer helps validate if file is a safe file
    '''
    class Meta:
        model = Files
        fields = ('file',)

class OfficeDocumentSerializer(serializers.ModelSerializer):
    '''
    This Class Serializer helps validate if file is a safe file
    '''
    file_type = serializers.CharField(required= True)
    class Meta:
        model = Files
        fields = ('file', 'file_type')

