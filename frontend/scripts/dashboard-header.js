// get user data from the localstorage
const metafetchUserData = localStorage.getItem("metafetchUserData");
let token, username;
// get page elements
const headerDDBtn = document.querySelector("#setting-dropdown"),
mbHeaderDDBtn = document.querySelector("#profile-set"),
headerDropdown = document.querySelector("#profile-settings-dd"),
menuBtn = document.querySelector("#menu-btn"),
mbCloseBtn = document.querySelector("#close-sm-bar");
const logoutBtn = document.querySelector("#logout-btn");
const sideNav = document.querySelector("#mb-dash-nav-links > div"),
sideNavCont = document.querySelector("#mb-dash-nav-links");

// get loader elements
const loaderCont = document.querySelector("#loader-cont");
const loader = document.querySelector("#loader");
const loadStatMsg = document.querySelector("#load-stat-msg");
const loadStatIcon = document.querySelector("#stat-icon");
const btnCont = document.querySelector("#loader-cont > #btns");
const btnOne = document.querySelector("#loader-cont > #btns > #btn-1");

// setting up your account
(()=> {
    if(metafetchUserData) {
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
    } else {
        //pop up, this user is not active, redirecting you to the login page
    }
    //
})();

sideNavCont.style.display = "none";
headerDropdown.style.display = "none";

// controlling the modal
// opens the loading modal
const openLoadStatModal = (message="")=> {
    window.scrollTo(0, 0);
    document.body.style.height = "100vh";
    document.body.style.overflowY = "hidden";
    loader.classList.add("loading");
    btnCont.style.display = "none";
    loadStatMsg.innerHTML = message || "loading...";
    loaderCont.style.display = "flex";
  }
  // set success or error state after submission
  const updateLoadStatModal = (stat, message)=> {
    loader.classList.remove("loading");
    loader.classList.add("loaded");
    if(stat === "error") {
      loadStatIcon.src = "../assets/icons/modal/error-icon.svg";
      btnCont.style.display = "flex";
    }  else if(stat === "success") {
      loadStatIcon.src = "../assets/icons/modal/success-icon.svg";
      btnCont.style.display = "none";
    }
    loadStatMsg.innerHTML = message;
  }
  // when the modal's back button is clicked
  btnOne.onclick = ()=> {
    document.body.style.overflowY = "auto";
    loader.classList.remove("loaded");
    loader.classList.add("loading");
    loaderCont.style.display = "none";
}

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
    if(logoutBtn.contains(e.target)) {
        openLoadStatModal();
    }
    if(loaderCont.contains(e.target)) {
        window.scrollTo(0, 0);
        document.body.style.height = "100vh";
        document.body.style.overflowY = "hidden";
        sideNavCont.style.display = "block";
    }
    if(menuBtn.contains(e.target)) {
        window.scrollTo(0, 0);
        document.body.style.height = "100vh";
        document.body.style.overflowY = "hidden";
        sideNavCont.style.display = "block";
    } else if((!sideNav.contains(e.target) || mbCloseBtn.contains(e.target)) && !logoutBtn.contains(e.target) && (!loaderCont.contains(e.target) || btnOne.contains(e.target))) {
        sideNavCont.style.display = "none";
        document.body.style.overflowY = "auto";
    }
}

// async function that logs the user out
async function logout(token) {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `token ${token}`);
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const fetchUrl = "https://metafetch86.herokuapp.com/api/auth/logout/";
    let response = await fetch(`${fetchUrl}`, requestOptions);
    let result = await response.json();
    return result;
}
logoutBtn.onclick = ()=> {
    console.log("logout", token);
    logout(token)
    .then((result)=> {
        let property = Object.keys(result)[0];
        if(result[property] === "User Logged out successfully") {
            localStorage.removeItem("metafetchUserData");
            updateLoadStatModal("success", `Logout successful <br> Redirecting you to the landing page...`);
            setTimeout(() => {
                window.location.replace("../");
            }, 800);
        } else {
            updateLoadStatModal("error", "error logging you out <br> check your connection and try again");
        }
    })
    .catch(error => console.log(error));
  }