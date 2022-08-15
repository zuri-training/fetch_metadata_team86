console.log("time to extract metadata files", token);
const fileInput = document.querySelector("#file-input");

fileInput.onchange = (e)=> {
    value = e.target.value;
    console.log(e.target.value);
    valueArr = value.split(".");
    fileExtension = valueArr[valueArr.length -1];
    console.log(fileExtension);
}

// let myHeaders = new Headers();
// myHeaders.append("Authorization", `token ${token}`);

// let formdata = new FormData();
// formdata.append("file", fileInput.files[0], "/C:/Users/Adegite/Zuri training/Project Phase/fetch_metadata_team86-1/backend/modules/test_files/DSC_0911.JPG");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   body: formdata,
//   redirect: 'follow'
// };

// fetch("https://metafetch86.herokuapp.com/api/extract_metadata/jpg_meta_extract/", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))



  // /api/extract_metadata/flat_file_metadata/

  // /api/extract_metadata/image_meta_extract/