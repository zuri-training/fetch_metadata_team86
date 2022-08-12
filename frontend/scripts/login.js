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
// form buttons
const loginBtn = document.querySelector("#login-btn");
const togglePwdBtn = document.querySelector("#show-password");
const togglePwdBtnImg = document.querySelector("#show-password > img");

// toggles the password visibility
let pwdState = true;
togglePwdBtn.onclick = ()=> {
  if(password.type === "password") {
    password.type = "text";
    togglePwdBtnImg.src = "../assets/icons/eye-slash-solid.svg";
  } else {
    password.type = "password";
    togglePwdBtnImg.src = "../assets/icons/eye-solid.svg";
  }
}
// controlling the modal
// opens the loading modal
const openLoadStatModal = ()=> {
  window.scrollTo(0, 0);
  document.body.style.height = "100vh";
  document.body.style.overflow = "hidden";
  loader.classList.add("loading");
  btnCont.style.display = "none";
  loadStatMsg.innerHTML = "creating your account...";
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
// async function that submits the form
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
// when the login form is submitted
loginForm.onsubmit = (e)=> {
  e.preventDefault();
  const loginData = {
    'email': email.value,
    'password': password.value,
  }
  openLoadStatModal();
  postData(loginData)
  .then((result)=> {
    if(result.code === 200) {
      localStorage.setItem("metafetchUserData", JSON.stringify(result.data));
      let ld = localStorage.getItem("metafetchUserData");
      updateLoadStatModal("success", `Login successful <br> Redirecting you to your dashboard...`);
        setTimeout(() => {
          window.location.replace("http://127.0.0.1:5500/frontend/dashboard/");
        }, 800);
    } else {
      let property = Object.keys(result)[0];
      updateLoadStatModal("error", result[property][0]);
    }
  })
  .catch(error => console.log(error));
}