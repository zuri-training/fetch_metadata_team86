console.log("sign up connnected");

userName="";
firstName="";
lastName="";
email="test@tester.com";
password="googoogaagaa";
confirmPassword = "googoogaagaa";

registerationData = {
    userName, firstName, lastName, email, password, confirmPassword,
}






async function postData(signupData) {
    const { userName, firstName, lastName, email, password, confirmPassword } = signupData;
    const registerUrl = "https://metafetch86.herokuapp.com/api/auth/register/";
    let respo = await fetch(`${registerUrl}?email=${email}&password=${password}&confirm_password=${confirmPassword}`, {
        method: 'POST',
        mode: 'no-cors', 
        //redirect: 'follow'
    });
    let data = await respo.json();
    return data;
}

postData(registerationData)
.then(response => console.log(response))
.catch(error => console.log(error));


async function getUserAsync(name) 
{
  let response = await fetch(`https://api.github.com/users/${name}`);
  let data = await response.json()
  return data;
}

getUserAsync('emmo')
  .then(data => console.log(data))
  .catch(error => console.log(error));