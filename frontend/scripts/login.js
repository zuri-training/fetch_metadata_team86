const email = "test@test.com",
password = "testertestingtests";

var requestOptions = {
  method: 'POST',
  mode: 'no-cors',
  redirect: 'follow'
};

fetch(`https://metafetch86.herokuapp.com/api/auth/login/?username=${email}&password=${password}`, requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));