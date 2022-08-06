from hachoir.parser import createParser
from hachoir.metadata import extractMetadata

def image_meta_extract(file_path, file_type=None):
    """
    This function is used to extract image metadata of type 'png'
    NOTE: 
    1. Avoid images from whatsapp because whatsapp strip off all metadata attached to an image
    2. Avoid images whose file extention has been manually changed
    3. Avoid images that does not have a file extention


    function returns {0: 0} if file is not a genuie image type of 'png'

    """

    try:
            parser = createParser(file_path)
            metadata = extractMetadata(parser= parser)
            dict_f = {}
            for line in metadata.exportPlaintext():
                meta = line.split(':')
                if meta[-1] == "":
                    continue
                else:
                    dict_f[meta[0].split('-')[1].strip()] = meta[-1]
            return dict_f
    except Exception as e:
        
        return {'message': "An error occured."}
        