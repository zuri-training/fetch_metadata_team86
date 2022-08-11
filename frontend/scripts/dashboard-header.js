const headerDDBtn = document.querySelector("#setting-dropdown");
const headerDropdown = document.querySelector("#profile-settings-dd");

headerDropdown.style.display = "none";

const toggleHeaderDropdown = () => {
    if(headerDropdown.style.display === "none") {
        headerDropdown.style.display = "flex";
    } else {
        headerDropdown.style.display = "none";
    }
}

const closeHeaderDropdown = () => {
    headerDropdown.style.display = "none";
}

headerDDBtn.onclick = ()=> {
    toggleHeaderDropdown();
}