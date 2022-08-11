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
  postData(loginData)
  .then((result)=> {
    console.log(result);
    if(result.code === 200) {
      console.log("success");
      console.log(result.data, JSON.stringify(result.data));
      localStorage.setItem("metafetchUserData", JSON.stringify(result.data));
      let ld = localStorage.getItem("metafetchUserData");
      console.log(JSON.parse(ld));
      //window.location.replace("");
    } else {
      console.log(result.data);
    }
  })
  .catch(error => console.log(error));
}