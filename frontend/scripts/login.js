console.log("login connnected");
// get loader elements
const loaderCont = document.querySelector("#loader-cont");
const loader = document.querySelector("#loader");
const loadStatMsg = document.querySelector("#load-stat-msg");
const loadStatIcon = document.querySelector("#stat-icon");
const btnCont = document.querySelector("#loader-cont > #btns");
const btnOne = document.querySelector("#loader-cont > #btns > #btn-1");

// get form elements
const
loginForm = document.querySelector("#login-form"),
email = document.querySelector("#email"),
password = document.querySelector("#password");
const loginBtn = document.querySelector("#login-btn");
const togglePwdBtn = document.querySelector("#show-password");
const togglePwdBtnImg = document.querySelector("#show-password > img");

togglePwdBtn.onclick = ()=> {
  
}
// controlling the modal
const openLoadStatModal = ()=> {
  window.scrollTo(0, 0);
  document.body.style.height = "100vh";
  document.body.style.overflow = "hidden";
  loader.classList.add("loading");
  btnCont.style.display = "none";
  loadStatMsg.innerHTML = "creating your account...";
  loaderCont.style.display = "flex";
}
const updateLoadStatModal = (stat, message)=> {
  loader.classList.remove("loading");
  loader.classList.add("loaded");
  if(stat === "error") {
    loadStatIcon.src = "../assets/icons/modal/error-icon.svg";
    btnCont.style.display = "flex";
  } else if(stat === "warning") {
    loadStatIcon.src = "../assets/icons/modal/warning-icon.svg";
    btnCont.style.display = "flex";
  } else if(stat === "success") {
    loadStatIcon.src = "../assets/icons/modal/success-icon.svg";
    btnCont.style.display = "none";
  }
  loadStatMsg.innerHTML = message;
}
btnOne.onclick = ()=> {
  document.body.style.overflowY = "auto";
  loader.classList.remove("loaded");
  loader.classList.add("loading");
  loaderCont.style.display = "none";
}

async function postData(formdata) {
  const { email, password } = formdata;
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
  };
  const fetchUrl = "https://metafetch86.herokuapp.com/api/auth/login/";
  let response = await fetch(`${fetchUrl}?username=${email}&password=${password}`, requestOptions);
    let result = await response.json();
    return result;
}

loginForm.onsubmit = (e)=> {
  e.preventDefault();
  const loginData = {
    'email': email.value,
    'password': password.value,
  }
  openLoadStatModal();
  postData(loginData)
  .then((result)=> {
    console.log(result);
    if(result.code === 200) {
      console.log("success");
      console.log(result.data, JSON.stringify(result.data));
      localStorage.setItem("metafetchUserData", JSON.stringify(result.data));
      let ld = localStorage.getItem("metafetchUserData");
      console.log(JSON.parse(ld));
      updateLoadStatModal("success", `Login successful <br> Redirecting you to your dashboard...`);
        setTimeout(() => {
          window.location.replace("http://127.0.0.1:5500/frontend/dashboard/");
        }, 1000);
    } else {
      console.log("error");
      let property = Object.keys(result)[0];
      updateLoadStatModal("error", result[property][0]);
    }
  })
  .catch(error => console.log(error));
}