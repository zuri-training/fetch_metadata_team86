
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import DocumentSerializer, OfficeDocumentSerializer
from modules.jpg_tiff_metadata import jpg_meta_ext
from modules.image_metadata import image_meta_extract
from modules.extract_metadata import extract_file_metadata
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

from hachoir.parser import createParser
from hachoir.metadata import extractMetadata

from exif import Image as exifImage
# frozen = jsonpickle.encode(obj)
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def image_meta_extract(request):
    data = request.FILES
    
    serializer = DocumentSerializer(data=data)
    if serializer.is_valid():

        document = serializer.validated_data['file']

        parser = createParser(document)
        metadata = extractMetadata(parser= parser)
        dict_f = {}
        for line in metadata.exportPlaintext():
            meta = line.split(':')
            if meta[-1] == "":
                continue
            else:
                dict_f[meta[0].split('-')[1].strip()] = meta[-1]

        try:
            print(document)
            instance = Files.objects.create(user=request.user, file=serializer.validated_data['file'], metadata_txt = dict_f)
            
            instance.save()

            return Response({
                'code': 200,
                'status': 'success',
                'message': f'Meta data has been extraxted Successfully! and has been saved',
                'data': [dict_f]
            }, status.HTTP_200_OK)

        except Exception as e:

            raise serializers.ValidationError({
                'message': f'{e}',
            })
    else:
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
        try:
            with open(document, 'rb') as img_file:
                img = exifImage(img_file)
                if not img.has_exif:
                    return {}
                else:
                    dict_i = {}
                    attr_list = img.list_all()
                    for attr in attr_list:
                        value = img.get(attr)
                        if type(value) not in [int, str, float]:
                            continue
                        else:
                            dict_i[attr] = value
                # print(dict_i)
                return dict_i

            if metadata != {}:

                instance = Files.objects.create(user=request.user, file=document, metadata_txt = metadata)
            
                instance.save()

                return Response({
                    'code': 200,
                    'status': 'success',
                    'message': f'Meta data has been extraxted Successfully! and has been saved',
                    'data': [metadata]
                }, status.HTTP_200_OK)
            else:
                raise serializers.ValidationError({
            
                })
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
def flat_file_metadata(request):
    data = request.data or request.query_params
    serializer =  OfficeDocumentSerializer(data= data)

    if serializer.is_valid():
        try:
            document = serializer.validated_data['file']
            file_type = serializer.validated_data['file_type']

            metadata = extract_file_metadata(file= document, file_type= file_type)
            
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