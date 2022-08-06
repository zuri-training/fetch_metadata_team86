# package to import document files
import docx
# package to import pdf files
from PyPDF2 import PdfReader
# packages to import pptx files
import collections 
import collections.abc
from importlib.metadata import metadata
from pptx import Presentation
# package to import xlsx files
from openpyxl import load_workbook

# function to convert datetime to the date in string
def parse_datetime(time):
    if type(time).__name__ == 'NoneType':
        return "Noneo"
    elif type(time).__name__ == 'datetime':
        return time.ctime()

# extraction functions
# fuction to extract doc metadata
def get_doc_metadata(file):
    doc_file = docx.Document(file)
    doc_metadata = {}
    prop = doc_file.core_properties
    doc_metadata["author"] = prop.author
    doc_metadata["category"] = prop.category
    doc_metadata["comments"] = prop.comments
    doc_metadata["content_status"] = prop.content_status
    doc_metadata["date_created"] = parse_datetime(prop.created)
    doc_metadata["identifier"] = prop.identifier
    doc_metadata["keywords"] = prop.keywords
    doc_metadata["last_modified_by"] = prop.last_modified_by
    doc_metadata["language"] = prop.language
    doc_metadata["date_modified"] = parse_datetime(prop.modified)
    doc_metadata["subject"] = prop.subject
    doc_metadata["title"] = prop.title
    doc_metadata["version"] = prop.version
    doc_metadata["file_extension"] = "doc"
    return doc_metadata

# fuction to extract pdf metadata

# fuction to extract xlsx metadata
def get_xlsx_metadata(file):
    xlsx_file = load_workbook(file)
    xlsx_metadata = {}
    xlsx_metadata["creator"] = xlsx_file.properties.creator
    xlsx_metadata["title"] = xlsx_file.properties.title
    xlsx_metadata["description"] = xlsx_file.properties.description
    xlsx_metadata["identifier"] = xlsx_file.properties.identifier
    xlsx_metadata["language"] = xlsx_file.properties.language
    xlsx_metadata["date_created"] = parse_datetime(xlsx_file.properties.created)
    xlsx_metadata["date_modified"] = parse_datetime(xlsx_file.properties.modified)
    xlsx_metadata["lastModifiedBy"] = xlsx_file.properties.lastModifiedBy
    xlsx_metadata["category"] = xlsx_file.properties.category
    xlsx_metadata["contentStatus"] = xlsx_file.properties.contentStatus
    xlsx_metadata["version"] = xlsx_file.properties.version
    xlsx_metadata["revision"] = xlsx_file.properties.revision
    xlsx_metadata["keywords"] = xlsx_file.properties.keywords
    xlsx_metadata["lastPrinted"] = xlsx_file.properties.lastPrinted
    xlsx_metadata["file_extension"] = "xlsx"
    return xlsx_metadata

# fuction to extract xlsx metadata
def get_pptx_metadata(file):
    prs = Presentation(file)
    pptx_metadata = {}
    pptx_metadata["author"] = prs.core_properties.author
    pptx_metadata["category"] = prs.core_properties.category
    pptx_metadata["comments"] = prs.core_properties.comments
    pptx_metadata["content_status"] = prs.core_properties.content_status
    pptx_metadata["date_created"] = parse_datetime(prs.core_properties.created)
    pptx_metadata["identifier"] = prs.core_properties.identifier
    pptx_metadata["keywords"] = prs.core_properties.keywords
    pptx_metadata["language"] = prs.core_properties.language
    pptx_metadata["last_modified_by"] = prs.core_properties.last_modified_by
    pptx_metadata["last_printed"] = prs.core_properties.last_printed
    pptx_metadata["date_modified"] = parse_datetime(prs.core_properties.modified)
    pptx_metadata["revision"] = prs.core_properties.revision
    pptx_metadata["subject"] = prs.core_properties.subject
    pptx_metadata["title"] = prs.core_properties.title
    pptx_metadata["version"] = prs.core_properties.version
    pptx_metadata["file_extension"] = "pptx"
    return pptx_metadata