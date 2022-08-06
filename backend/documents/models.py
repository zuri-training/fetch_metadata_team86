from django.db import models
from accounts.models import CustomUser
from django.conf import settings
from django.db.models.signals import post_save

from django.dispatch import receiver
import datetime
import pytz
# Create your models here.


class Files(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    file = models.FileField(upload_to="document_to_extract", max_length=100)
    metadata_txt = models.TextField()
    extracted = models.DateTimeField(auto_now=False, auto_now_add=True)
    

    # author = models.CharField(max_length=50)
    # image_width = models.CharField(max_length=50)
    # image_height = models.CharField(max_length=50)
    # image_orientation = models.CharField(max_length=100)
    # pixel = models.CharField(max_length=100)
    # pixel_format = models.CharField(max_length=100)
    # creation_date = models.CharField(max_length=100)
    # camera_aperture = models.CharField(max_length=100)
    # camera_exposure = models.CharField(max_length=100)
    # camera_model = models.CharField(max_length=100)
    # camera_manufacturer = models.CharField(max_length=100)
    # compression = models.CharField(max_length=100)
    # thumbnail_size = models.CharField(max_length=100)
    # iso_speed_rating = models.CharField(max_length=100)
    # exif_version = models.CharField(max_length=100)
    # date = models.CharField(max_length=100)
    # compressed_bits_per_pixel = models.CharField(max_length=100)
    # Producer = models.CharField(max_length=100)
    # Comment = models.CharField(max_length=100)
    # mime_type = models.CharField(max_length=100)
    # endianness = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.user.email} extracted this on {self.extracted}'

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Document'
        verbose_name_plural = 'Documents'

# class JpgFile(models.Model):
#     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
#     author = models.CharField(max_length=50)
#     artist = models.CharField(max_length=50)
#     make = models.CharField(max_length=50)
#     model = models.CharField(max_length=50)
#     orientation = models.CharField(max_length=100)
#     x_resolution = models.CharField(max_length=100)
#     y_resolution = models.CharField(max_length=100)
#     resolution_unit = models.CharField(max_length=100)
#     software = models.CharField(max_length=100)
#     datetime = models.CharField(max_length=100)
#     gps_ifd_pointer = models.CharField(max_length=100)
#     camera_manufacturer = models.CharField(max_length=100)
#     compression = models.CharField(max_length=100)
#     jpeg_interchange_format = models.CharField(max_length=100)
#     exposure_time = models.CharField(max_length=100)
#     exposure_program = models.CharField(max_length=100)
#     photographic_sensitivity = models.CharField(max_length=100)
#     exif_version = models.CharField(max_length=100)
#     color_space = models.CharField(max_length=100)
#     compressed_bits_per_pixel = models.CharField(max_length=100)
#     file_source = models.CharField(max_length=100)
#     Comment = models.CharField(max_length=100)
#     mime_type = models.CharField(max_length=100)
#     endianness = models.CharField(max_length=100)

#     def __str__(self):
#         return f'Jpg {self.user.email}'

#     class Meta:
#         db_table = ''
#         managed = True
#         verbose_name = 'JpgFile'
#         verbose_name_plural = 'JpgFiles'

jpg_attribute = ['author','artist', 'copyright', 'make', 'model', 'orientation', 
'x_resolution', 'y_resolution', 
'resolution_unit', 'software', 
'datetime', 'y_and_c_positioning', 
'_exif_ifd_pointer', '_gps_ifd_pointer', 
'compression', 'jpeg_interchange_format', 
'jpeg_interchange_format_length', 
'exposure_time', 'f_number', 'exposure_program', 
'photographic_sensitivity', 'exif_version', 
'datetime_original', 'datetime_digitized', 
'components_configuration', 'compressed_bits_per_pixel',
'exposure_bias_value', 'max_aperture_value', 
'metering_mode', 'light_source', 'flash', 
'focal_length', 'maker_note', 'user_comment',
'subsec_time', 'subsec_time_original',
'subsec_time_digitized', 'flashpix_version',

'color_space', 'pixel_x_dimension', 'pixel_y_dimension',
'_interoperability_ifd_Pointer', 'sensing_method',
'file_source', 'scene_type', 'cfa_pattern',
'custom_rendered', 'exposure_mode', 'white_balance',
'digital_zoom_ratio', 'focal_length_in_35mm_film',
'scene_capture_type', 'gain_control',
'contrast', 'saturation','sharpness',
'subject_distance_range', 'gps_version_id']

