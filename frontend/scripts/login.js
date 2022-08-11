console.log("login connnected");

const
loginForm = document.querySelector("#login-form"),
email = document.querySelector("#email"),
password = document.querySelector("#password");

// const loginData = {
//   'username': userName.value,
//   'email': email.value,
//   'password': password.value,
//   'confirm_password': confirmPassword.value,
// }

async function postData(formdata) {
  const { email, password } = formdata;
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    mode: 'no-cors'
  };
  const fetchUrl = "https://metafetch86.herokuapp.com/api/auth/login/";
  let response = await fetch(`${fetchUrl}?username=${email}&password=${password}`, requestOptions);
    let result = await response.text();
    return result;
}

loginForm.onsubmit = (e)=> {
  e.preventDefault();
  const loginData = {
    'email': email.value,
    'password': password.value,
  }
  postData(loginData)
  .then((result)=> {
    console.log(result);
    if(result.code === 200) {
      localStorage.setItem("metafetchUserData", result.data);
      window.location.replace("");
    } else {
      console.log(result.data);
    }
  })
  .catch(error => console.log(error));
}