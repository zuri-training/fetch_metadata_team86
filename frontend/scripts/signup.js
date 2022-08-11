console.log("sign up connnected");

const userName = document.querySelector("#username"),
email = document.querySelector("#email"),
password = document.querySelector("#password"),
confirmPassword = document.querySelector("#cpassword");

// const registerationData = {
//   'username': userName.value,
//   'email': email.value,
//   'password': password.value,
//   'confirm_password': confirmPassword.value,
// }
const registerationData = {
  'username': "stilltesteresossres",
  'email': "stilltesterossres@mail.com",
  'password': "cvfgdgfhgty565765857",
  'confirm_password': "cvfgdgfhgty565765857",
}

async function postData(formdata) {
  const { username, email, password, confirm_password } = formdata;
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    mode: 'no-cors'
  };
  const fetchUrl = "https://metafetch86.herokuapp.com/api/auth/register/";
  let response = await fetch(`${fetchUrl}?username=${username}&email=${email}&password=${password}&confirm_password=${confirm_password}`, requestOptions);
    let result = await response.text();
    return result;
}

postData(registerationData).then(result=> console.log(result));
