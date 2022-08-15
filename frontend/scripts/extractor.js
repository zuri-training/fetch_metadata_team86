console.log("time to extract metadata files", token);
const fileInput = document.querySelector("#file-input");
const getFileForm = document.querySelector("#get-file-form");

// when the file upload form is changed
fileInput.onchange = (e)=> {
    value = e.target.value;
    console.log(e.target.value);
}

const getJPEGMetadata = async(fileObj, filePath)=> {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `token ${token}`);

    let formdata = new FormData();
    formdata.append("file", fileObj, filePath);

    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
    };

    // checks the file type from the extension
    let valueArr = filePath.split(".");
    let fileExtension = valueArr[valueArr.length -1];
    console.log(fileExtension);
    // if its an image file, this runs
    if(fileExtension === "jpg" || fileExtension == "jpeg" || fileExtension == "png" || fileExtension == "tiff") {
        let response = await fetch("https://metafetch86.herokuapp.com/api/extract_metadata/image_meta_extract/", requestOptions);
        let result = response.json();
        return result;
    }
    // if it is a doc, pdf, xlsx, pptx file, this works
    else if(fileExtension === "doc" || fileExtension == "docx" || fileExtension == "pdf" || fileExtension == "pptx" || fileExtension == "xlsx") {
        let response = await fetch("https://metafetch86.herokuapp.com/api/extract_metadata/flat_file_metadata/", requestOptions);
        let result = response.json();
        return result;
    }
}

getFileForm.onsubmit = (e)=> {
    e.preventDefault();
    fileObj = fileInput.files[0];
    filePath = fileInput.value;
    openLoadStatModal("extracting your data...");
    getJPEGMetadata(fileObj, filePath)
    .then((result)=> {
        let resultTemplate = "";
        console.log(result);
        if(result["status"] === "success") {
            for (const key of Object.keys(result["data"][0])) {
                console.log(key);
                let property = key;
                let attribute = result["data"][0][key];
                resultTemplate += `
                    <div style="display: flex; gap: 30px; justify-content: space-between">
                        <h3>${property}</h3>
                        <h4>${attribute}</h4>
                    </div>
                `;
            }
            resultCont = `
                    <h1 style="text-align: center;">Your metadata</h1>
                    <div style="width: 60%; max-width: 300px; display: flex; flex-flow: column nowrap; gap: 20px; align-items: flex-start;">${resultTemplate}</div>
                `;
            console.log(resultTemplate);
            updateLoadStatModal("success", "file upload successful!");
            updateLoadStatModal("success", resultCont);
        } else {
            updateLoadStatModal("error", "error uploading file <br> Try again later!");
        }
    })
    .catch(error => {console.log(error);updateLoadStatModal("error", "error uploading file <br> Try again later!");})
}


//   /api/extract_metadata

//   /api/extract_metadata/image_meta_extract/