# Back-End: fetch_metadata_team86
A web application that allows users to upload files and extract the metadata of the files 

NOTE: (FOR THE BACKEND DEVS ALONE)
* fetch_metadata is the project file
* metafetch_api is the created app
* Please do not forget to create your virtual environment first before cloning this project
* This is just my humble contribution, feel free to add yours
* We are still developing this, cooking more features

# Media Storage Tool
- Cloudinary
- Documentation: [Cloundinary Documentation](https://pypi.org/project/django-cloudinary-storage/#:~:text=Django%20Cloudinary%20Storage%20is%20a,both%20media%20and%20static%20files.)
# Live API

# API documentation

## Registering New User

This API end-point would be used to register new users in the metafetch application and login in the user
immidiatly after registration.

- **End Point:** /api/auth/register/?email=**NAME@GMAIL.COM**&password=**PASSWORD**&confirm_password=**CONFIRM_PASSWORD**

- **Methods:** POST

- Sample Responce

```
{
    "code": 200,
    "data": [
        {
            "user_id": 2,
            "token": "d08e094b22bbb0345b1b79b5423f1bb7fbbb59ab",
            "username": "",
            "firt_name": "",
            "last_name": "",
            "email": "myname@gmail.com",
            "last_login": "2022-08-02T22:45:24.933115Z"
        }
    ]
}
```
- Optional Fields
> - `username`
> - `firt_name`
> - `last_name`

## Login User

This end-point would be used to log in User into the application. It returns an token and the 
properties of the user who has just been logged-in.

Here, notice that the email used to register in used as the username, this is done so that 
instead of logging in with username which can be forgotten the user should use email instead as
it is designed on the official MetaFetch UI.

- **End Point:** /api/auth/login/?username=**NAME@GMAIL.COM**&password=**PASSWORD**

- **Methods:** POST

- Sample Responce

```
{
    "code": 200,
    "data": [
        {
            "user_id": 2,
            "token": "d08e094b22bbb0345b1b79b5423f1bb7fbbb59ab",
            "username": "",
            "firt_name": "",
            "last_name": "",
            "email": "myname@gmail.com",
            "last_login": "2022-08-02T22:45:24.933115Z"
        }
    ]
}
```

## Logout User

This end-point would be used to log a User out from the application. There is nothing serious goining 
on here. The User Token must be passed along as an header to know which user wants to logout. The front-end should remove the Token from where ever it is saved on the front-end or browser when it returns a success code `200`. 

- **End Point:** /api/auth/logout/

- **Methods:** GET

- Sample Responce of stattus `200` - Success

```
{
    "detail": "User Logged out successfully"
}
```
- Sample Responce of stattus `401` - Unautorized

```
{
    "detail": "Authentication credentials were not provided."
}
```

- **JavaScript Code using Fetch**
```javascript
var myHeaders = new Headers();
myHeaders.append("Authorization", "token d08e094b22bbb0345b1b79b5423f1bb7fbbb59ab");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/api/auth/logout/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```



## Change Password User

This gives an authenticated user the oppotunity to change password.

- **End Point:** api/auth/change-password/?old_password=**OLD_PASSWORD**&new_password=**NEW_PASSWORD**

- **Methods:** PUT

- Sample Responce of `200` - Success

```
{
    "status": "success",
    "code": 200,
    "message": "Password updated successfully",
    "data": []
}
```


- Sample Responce of stattus `401` - Unautorized
```
{
    "detail": "Authentication credentials were not provided."
}
```
- Sample Responce of stattus `400` - Bad Request

```
{
    "old_password": [
        "This field is required."
    ]
}
```
- JavaScript Fetch Sample Code

```javascript
var myHeaders = new Headers();
myHeaders.append("Authorization", "token d08e094b22bbb0345b1b79b5423f1bb7fbbb59ab");

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`http://127.0.0.1:8000/api/auth/change-password/?old_password=${OLD_PASSWORD}&new_password=${NEW_PASSWORD}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

## Forgot Password

The [Django documentation](https://docs.djangoproject.com/en/dev/ref/contrib/csrf/#ajax) provides more information on retrieving the CSRF token using jQuery and sending it in requests. The CSRF token is saved as a cookie called csrftoken that you can retrieve from a HTTP response, which varies depending on the language that is being used.

