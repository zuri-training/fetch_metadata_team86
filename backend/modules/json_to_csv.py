# author: Taiwo Adegite

import csv
import json

# an example python dictionary to be converted to JSON
dictionary = {
    "name": "First step to success",
    "created": "12:00:20",
    "updated": "24:12:00",
    "author": "MetaFetch",
    "size": "45 MB",
    "height": 300,
    "width": 100,
    "file_extention": "txt"
}
# convert python dictionary to json
Json = json.dumps(dictionary, indent=4)

# convert JSON to python dictionary
my_dict = json.loads(Json)

# open a csv file
with open('test.csv', 'w') as csvfile:
    for key in my_dict.keys():
        csvfile.write("%s,%s\n" % (key, my_dict[key]))