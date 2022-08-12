console.log("sign up connnected");

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
    postData(registerationData).then(result=> {
      console.log(result);
      if(result.code === 200) {
        console.log("success");
        window.location.replace("http://127.0.0.1:5500/frontend/pages/login.html");
      } else {
        console.log("error");
        if(response.password[0] === "This password is too common.") {
          password.setCustomValidity("This password is too common.");
        }
        if(response.username[0] === "User with this username already exist.") {
          userName.setCustomValidity("User with this username already exist.");
        }
      }
    });
  }
}
