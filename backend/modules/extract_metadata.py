from modules import get_metadata

def extract_file_metadata(file, file_type= None):
    if file_type == "doc":
        meta = get_metadata.get_doc_metadata(file)
        return meta
        
    elif file_type == "pdf":
        meta = get_metadata.get_pdf_metadata(file)
        return meta
    #elif file_type == "csv":
    #    get_metadata.get_csv_metadata(file)
    elif file_type == "pptx":
        meta = get_metadata.get_pptx_metadata(file)
        return meta
    elif file_type == "xlsx":
        meta = get_metadata.get_xlsx_metadata(file)
        return meta
    #elif file_type == "txt":
    #    get_metadata.get_txt_metadata(file)


# pdf_metadat_extract("C:/Users/Adegite/Zuri training/Project Phase/fetch_metadata_team86-1/backend/modules/test_files/Profile.pdf")
# tests
# extract_file_metadata("file-location/test.csv", "csv")
# extract_file_metadata("file-location/test.docx", "doc")
#extract_file_metadata("file-location/test.pdf"pdf")
# extract_file_metadata("file-location/test.xlsx", "xlsx")
# extract_file_metadata("file-location/test.pptx", "pptx")

# tests
# extract_file_metadata("file-location/test.csv", "csv")
# extract_file_metadata("C:/Users/Adegite/Zuri training/Project Phase/fetch_metadata_team86-1/backend/modules/test_files/21-Day spiritual bootcamp Instructional manual.docx", "doc")
#extract_file_metadata("C:/Users/Adegite/Zuri training/Project Phase/fetch_metadata_team86-1/backend/modules/test_files/Presentation title 1.pptx", "pdf")
# extract_file_metadata("C:/Users/Adegite/Zuri training/Project Phase/fetch_metadata_team86-1/backend/modules/test_files/auto-co.xlsx", "xlsx")
# extract_file_metadata("C:/Users/Adegite/Zuri training/Project Phase/fetch_metadata_team86-1/backend/modules/test_files/Presentation title 1.pptx", "pptx")