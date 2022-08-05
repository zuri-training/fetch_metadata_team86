
from PIL import image
from PIL.ExifTags import TAGS
# path to the image or video
imageName = "image.jpg"
#    read the image data using PIL
image = Image.open (imageName)
#  extract other basic metadata 


info_dicts = {
    "Filename": image.filename,
    "Image Size": image.size,
    "Image Height": image.height,
    "Image Width": image.width,
    "Image Format": image.format,
    "Image Mode": image.mode,
    "Image is Animated": getattr(image, "is_animated" , False),

    "Frames in Image": getattr(image, "n__frames", 1)
}

for label, value in info_dicts.items():
 print(f"{label: 25}: {value}")

#  extract EXIF data
exifdata = image.getexif()

# iterating over all EXIF data fields
for tag__id in exifdata:
        # get the tag name, instead of human unreadable tag id
        tag - TAGS.get(tag__id, tag__id)
        data = exifdata.get(tag__id)
        # decode the bytes
        if ininstance(data, bytes):
            data= data.decode()
            print(f"{tag:25}: {data}")