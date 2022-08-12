const headerDDBtn = document.querySelector("#setting-dropdown"),
mbHeaderDDBtn = document.querySelector("#profile-set"),
headerDropdown = document.querySelector("#profile-settings-dd"),
menuBtn = document.querySelector("#menu-btn"),
mbCloseBtn = document.querySelector("#close-sm-bar");

const sideNav = document.querySelector("#mb-dash-nav-links > div"),
sideNavCont = document.querySelector("#mb-dash-nav-links");

const logoutBtn = document.querySelector("#logout-btn");

sideNavCont.style.display = "none";
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

document.onclick = (e)=> {
    if(headerDDBtn.contains(e.target) || mbHeaderDDBtn.contains(e.target)) {
        toggleHeaderDropdown();
    } else {
        closeHeaderDropdown();
    }
    if(menuBtn.contains(e.target)) {
        window.scrollTo(0, 0);
        document.body.style.height = "100vh";
        document.body.style.overflow = "hidden";
        sideNavCont.style.display = "block";
    } else if(!sideNav.contains(e.target) || mbCloseBtn.contains(e.target)) {
        sideNavCont.style.display = "none";
        document.body.style.overflowY = "auto";
    }
}

logoutBtn.onclick = ()=> {
    console.log("logout");
}
