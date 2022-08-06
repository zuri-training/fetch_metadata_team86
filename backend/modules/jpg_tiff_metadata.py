
from exif import Image


def jpg_meta_ext(file_path, file_type=None):
    """
    This function is used to extract image metadata of type 'jpg', 'jpeg', 'tif' or 'tiff'
    NOTE: 
    1. Avoid images from whatsapp because whatsapp strip off all metadata attached to an image
    2. Avoid images whose file extention has been manually changed
    3. Avoid images that does not have a file extention


    function returns {0: 0} if file is not a genuie image type of 'jpg', 'jpeg', 'tif' or 'tiff'

    """
    img_filetypes = ['jpg', 'jpeg', 'tif', 'tiff','webp']

    try:
        with open(file_path, 'rb') as img_file:
            img = Image(img_file)
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
    except Exception as e:
        print(e)
        return {'message': f"{e}."}
        