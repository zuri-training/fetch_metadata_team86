import get_metadata

def extract_file_metadata(file, file_type):
    if file_type == "doc":
        meta = get_metadata.get_doc_metadata(file)
        print(meta)
    # elif file_type == "pdf":
    #     meta = pdf_metadata.get_pdf_metadata(file)
    #     print(meta)
    #elif file_type == "csv":
    #    get_metadata.get_csv_metadata(file)
    elif file_type == "pptx":
        meta = get_metadata.get_pptx_metadata(file)
        print(meta)
    elif file_type == "xlsx":
        meta = get_metadata.get_xlsx_metadata(file)
        print(meta)
    #elif file_type == "txt":
    #    get_metadata.get_txt_metadata(file)



# tests
# extract_file_metadata("file-location/test.csv", "csv")
extract_file_metadata("file-location/test.docx", "doc")
#extract_file_metadata("file-location/test.pdf"pdf")
extract_file_metadata("file-location/test.xlsx", "xlsx")
extract_file_metadata("file-location/test.pptx", "pptx")