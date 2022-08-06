from django.shortcuts import redirect
import cloudinary
import cloudinary.uploader
import cloudinary.api

def index(request):
#     public_id = 'https://res.cloudinary.com/demo/image/upload/a_exif/exif_sample.jpg'
#     cloudinary.uploader.explicit("exif_sample.jpeg", 
#    array("public_id" => "exif_sample", "colors" => TRUE, "exif" => TRUE))
    return redirect("https://github.com/zuri-training/fetch_metadata_team86#readme")
