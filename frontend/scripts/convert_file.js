const addPar = document.querySelector("#add-par");
const convBtn = document.querySelector("#conv-btn");
const mobile = window.matchMedia( '(max-width: 900px)' );

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