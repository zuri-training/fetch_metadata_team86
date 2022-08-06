from logging import exception
from msilib.schema import File
from operator import index
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import DocumentSerializer
from modules.jpg_tiff_metadata import jpg_meta_ext
from modules.image_metadata import image_meta_extract
from modules.json_to_csv import dict_to_csv


from rest_framework.response import Response
from rest_framework import serializers, generics, status
from rest_framework.views import APIView
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser
from django.shortcuts import render, get_object_or_404


from .models import Files
import json
import jsonpickle
import pandas as pd
# frozen = jsonpickle.encode(obj)
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def image_meta_extract(request):
    data = request.FILES
    
    # go on to register the user
    serializer = DocumentSerializer(data=data)
    if serializer.is_valid():
        document = serializer.validated_data['file']
        metadata = image_meta_extract(document)
        try:
            instance = Files.objects.create(user=request.user, file=document, metadata_txt = metadata)
            
            instance.save()

            return Response({
                'code': 200,
                'status': 'success',
                'message': f'Meta data has been extraxted Successfully! and has been saved',
                'data': [metadata]
            }, status.HTTP_200_OK)

        except Exception as e:

            raise serializers.ValidationError({
                'message': f'{e}',
            })
    else:
        # raise validations error
        raise serializers.ValidationError(
            serializer.errors
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def jpg_meta_extract(request):
    data = request.FILES
    
    # go on to register the user
    serializer = DocumentSerializer(data=data)
    if serializer.is_valid():
        document = serializer.validated_data['file']
        metadata = jpg_meta_ext(document.temporary_file_path())
        try:
            instance = Files.objects.create(user=request.user, file=document, metadata_txt = metadata)
            
            instance.save()

            return Response({
                'code': 200,
                'status': 'success',
                'message': f'Meta data has been extraxted Successfully! and has been saved',
                'data': [metadata]
            }, status.HTTP_200_OK)

        except Exception as e:

            raise serializers.ValidationError({
                'message': f'{e}',
            })
        
    else:
        # raise validations error
        raise serializers.ValidationError(
            serializer.errors
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_files(request):
    try:
        files = Files.objects.filter(user = request.user)
        
        return Response({
                'code': 200,
                'status': 'success',
                'message': 'Successfully!',
                'data': [files.values()]
            }, status.HTTP_200_OK)
    except Exception as e:

        # raise validations error
        raise serializers.ValidationError(
            # serializer.errors
        )


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_file(request, id):
    try:
    
        file = Files.objects.filter(id=id, user=request.user)
        file.delete()

        return Response({
                    'code': 200,
                    'status': 'success',
                    'message': 'File have been deleted Successfully!',
                    'data': []
                }, status.HTTP_200_OK)
    except Exception as e:

        # raise validations error
        raise serializers.ValidationError(
            e
        )