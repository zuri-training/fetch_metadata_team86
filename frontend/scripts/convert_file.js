const addPar = document.querySelector("#add-par");
const convBtn = document.querySelector("#conv-btn");
const fileInput = document.querySelector("#file-input");
const mobile = window.matchMedia( '(max-width: 900px)' );


if(fileInput.value === ""){
    convBtn.classList.add("no-value")
    convBtn.type="button"
            }

convBtn.addEventListener("click",(e)=>{
    if(fileInput.value === ""){
        convBtn.classList.add("no-value")
        convBtn.type="button";
        alert("Please upload a file");
                }
    // else{
    //     convBtn.classList.remove("no-value")
    //     convBtn.type="submit"
    // }
    // if(e.target.type == "button"){
    //     alert("Please upload a file")
    // }

})

fileInput.addEventListener("change",()=>{
    convBtn.classList.remove("no-value")
    convBtn.type="submit"
})
if(mobile.matches){
    mobileView()
            };
mobile.addEventListener("change", ()=>{

    if(mobile.matches){
    mobileView()
    }
    else{
        desktopView()
        
            }
});

function mobileView(){
// addpar text
addPar.textContent="Click here to upload a file."
// Form Button text
convBtn.textContent ="Convert File"

}



function desktopView(){
addPar.textContent="Click here to upload a file. You can also drag & drop it here."
// Form Button text
convBtn.textContent ="Convert"
}