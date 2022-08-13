const metafetchUserData = localStorage.getItem("metafetchUserData");
let token, username;
const headerDDBtn = document.querySelector("#setting-dropdown"),
mbHeaderDDBtn = document.querySelector("#profile-set"),
headerDropdown = document.querySelector("#profile-settings-dd"),
menuBtn = document.querySelector("#menu-btn"),
mbCloseBtn = document.querySelector("#close-sm-bar");
const logoutBtn = document.querySelector("#logout-btn");
const sideNav = document.querySelector("#mb-dash-nav-links > div"),
sideNavCont = document.querySelector("#mb-dash-nav-links");

(()=> {
    if(metafetchUserData !== "null") {
        console.log(JSON.parse(metafetchUserData)[0]);
        token = JSON.parse(metafetchUserData)[0].token;
        username = JSON.parse(metafetchUserData)[0].username;
        profilePics = JSON.parse(metafetchUserData)[0].user_profile_pics;
        document.querySelector("#profile-username > span").textContent = username;
        if(profilePics !== "") {
            document.querySelector("#profile-img").innerHTML = `<img src=${profilePics} alt="" style="width: 100%;" >`;
            mbHeaderDDBtn.innerHTML = `<img src=${profilePics} alt="" style="width: 100%;" >`;
        } else {
            document.querySelector("#profile-img").innerHTML = username.substring(0, 2);
            mbHeaderDDBtn.innerHTML = username.substring(0, 2);
        }
    }
    //
})();

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

const logout = ()=> {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
        
    let requestOptions = {
        method: 'GET',
           headers: myHeaders,
           redirect: 'follow'
        };
         
        fetch("https://metafetch86.herokuapp.com/api/auth/logout/", requestOptions)
           .then(response => response.text())
           .then(result => console.log(result))
           .catch(error => console.log('error', error));
}