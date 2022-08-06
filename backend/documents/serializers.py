
from rest_framework import serializers
from .models import Files


from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response

class DocumentSerializer(serializers.ModelSerializer):
    '''
    This Class Serializer helps validate if file is a safe file
    '''
    def perform_create(self, serializer):
        serializer.save(user= self.request.user)

    class Meta:
        model = Files
        fields = ('file',)

