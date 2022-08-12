console.log("sign up connnected");
// get loader elements
const loaderCont = document.querySelector("#loader-cont");
const loader = document.querySelector("#loader");
const loadStatMsg = document.querySelector("#load-stat-msg");
const loadStatIcon = document.querySelector("#stat-icon");
const btnCont = document.querySelector("#loader-cont > #btns");
const btnOne = document.querySelector("#loader-cont > #btns > #btn-1");
const btnTwo = document.querySelector("#loader-cont > #btns > #btn-2");

// get form elements
const registerForm = document.querySelector("#registeration-form"),
userName = document.querySelector("#username"),
email = document.querySelector("#email"),
password = document.querySelector("#password"),
confirmPassword = document.querySelector("#cpassword"),
submitBtn = document.querySelector("#submit-register-form");

let cPassGood = false;

const inputs = document.querySelectorAll("#registeration-form input");
inputs.forEach((input)=> {
  input.oninput = (e)=> {
    e.target.value = e.target.value.trim();
  }
  input.onblur = (e)=>{
    if(e.target.value.split(" ").length > 1) {
      console.log(true);
      e.target.value = e.target.value.split(" ").join("");
      const inputName = e.target.name;
      e.target.setCustomValidity(`There can't be whitespace between ${inputName}`);
    }
  }
  input.onfocus = (e)=>{
    e.target.setCustomValidity("");
  }
});

confirmPassword.onblur = (e)=> {
  if(e.target.value !== password.value) {
    e.target.setCustomValidity(`confirm password doesn't have the same value as password`);
    cPassGood = false;
  } else {
    e.target.setCustomValidity(``);
    cPassGood = true;
  }
}
password.onblur = (e)=> {
  if(!Number(e.target.value) && e.target.value.length < 9) {
    e.target.setCustomValidity(`password must be more than 8 characters`);
    cPassGood = false;
  }
  else if(Number(e.target.value)) {
    e.target.setCustomValidity(`password cannot be entirely numeric`);
    cPassGood = false;
  } else {
    e.target.setCustomValidity(``);
    cPassGood = true;
  }
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
  } else if(stat === "warning") {
    loadStatIcon.src = "../assets/icons/modal/warning-icon.svg";
  } else if(stat === "success") {
    loadStatIcon.src = "../assets/icons/modal/success-icon.svg";
  }
  loadStatMsg.innerHTML = message;
  btnCont.style.display = "flex";
}
btnOne.onclick = ()=> {
  document.body.style.overflowY = "auto";
  loader.classList.remove("loaded");
  loader.classList.add("loading");
  loaderCont.style.display = "none";
}

async function postData(formdata) {
  const { username, email, password, confirm_password } = formdata;
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
  };
  const fetchUrl = "https://metafetch86.herokuapp.com/api/auth/register/";
  let response = await fetch(`${fetchUrl}?username=${username}&email=${email}&password=${password}&confirm_password=${confirm_password}`, requestOptions);
  let result = await response.json();
  return result;
}

registerForm.onsubmit = (e)=> {
  e.preventDefault();
  if(cPassGood) {
    console.log("in here");
    const registerationData = {
      'username': userName.value,
      'email': email.value,
      'password': password.value,
      'confirm_password': confirmPassword.value,
    }
    openLoadStatModal();
    postData(registerationData).then(result=> {
      console.log(result);
      if(result.code === 200) {
        console.log("success");
        updateLoadStatModal("success", `This user account has been created <br> Redirecting you to the login page...`);
        setTimeout(() => {
          window.location.replace("http://127.0.0.1:5500/frontend/pages/login.html");
        }, 3000);
      } else {
        console.log("error", );
        let property = Object.keys(result)[0];
        updateLoadStatModal("error", result[property][0]);
      }
    });
  }
}
