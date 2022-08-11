const headerDDBtn = document.querySelector("#setting-dropdown"),
mbHeaderDDBtn = document.querySelector("#profile-set"),
headerDropdown = document.querySelector("#profile-settings-dd");

const logoutBtn = document.querySelector("#logout-btn");

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
const openHeaderDropdown = () => {
    headerDropdown.style.display = "none";
    console.log("open");
}

document.onclick = (e)=> {
    if(headerDDBtn.contains(e.target) || mbHeaderDDBtn.contains(e.target)) {
        toggleHeaderDropdown();
    } else {
        closeHeaderDropdown();
    }
}

logoutBtn.onclick = ()=> {
    console.log("logout");
}
