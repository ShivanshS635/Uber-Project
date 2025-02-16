# /users/register Endpoint Documentation

## Description

This endpoint is used to register new users in the system. It requires specific user details to create an account.

## Request Method

POST

## Endpoint URL

/users/register

## Request Body

The request body should be in JSON format and contain the following fields:

```json
{
  "firstName": "string", // Required: User's first name.
  "lastName": "string",  // Required: User's last name.
  "email": "string",     // Required: User's email address. Must be a valid email format.
  "password": "string",  // Required: User's password. Must be at least 6 characters long.
}
```

## Response Codes

| Status Code | Description                                                      |
| ----------- | ---------------------------------------------------------------- |
| 201         | Created: User successfully registered.                           |
| 400         | Bad Request:  Indicates that the server could not understand the request due to invalid syntax. |
| 409         | Conflict: Indicates that the email is already registered.       |
| 500         | Internal Server Error:  Indicates a server-side error.          |

## Example Success Response

```json
{
    "message": "User registered successfully",
    "userId": "uniqueUserId"
}
```

## Example Error Response

```json
{
    "message": "Email already registered"
}
```

# /users/login Endpoint Documentation

## Description

This endpoint is used to authenticate users and provide a token for accessing protected routes.

## Request Method

POST

## Endpoint URL

/users/login

## Request Body

The request body should be in JSON format and contain the following fields:

```json
{
  "email": "string",     // Required: User's email address. Must be a valid email format.
  "password": "string"   // Required: User's password. Must be at least 6 characters long.
}
```

## Response Codes

| Status Code | Description                                                      |
| ----------- | ---------------------------------------------------------------- |
| 200         | OK: User successfully authenticated.                             |
| 400         | Bad Request: Indicates that the server could not understand the request due to invalid syntax. |
| 401         | Unauthorized: Invalid email or password.                         |
| 500         | Internal Server Error: Indicates a server-side error.            |

## Example Success Response

```json
{
    "token": "jwtToken",
    "user": {
        "id": "uniqueUserId",
        "email": "user@example.com"
    }
}
```

## Example Error Response

```json
{
    "message": "Invalid Email or Password"
}
```

# /user/profile Endpoint Documentation

## Description

This endpoint returns the details of the authenticated user.

## Request Method

GET

## Endpoint URL

/user/profile

## Request Headers

Authorization: Bearer <token>

## Response Codes

| Status Code | Description                                        |
| ----------- | -------------------------------------------------- |
| 200         | OK: Returns user profile details.                |
| 401         | Unauthorized: Invalid or missing token.          |
| 500         | Internal Server Error: Indicates a server error.   |

## Example Success Response

```json
{
    "id": "uniqueUserId",
    "email": "user@example.com",
    "fullname": {
         "firstname": "John",
         "lastname": "Doe"
    }
    // ...other user fields...
}
```

## Example Error Response

```json
{
    "message": "Unauthorized"
}
```

# /user/logout Endpoint Documentation

## Description

This endpoint logs out the user by clearing the token and adding it to a blacklist.

## Request Method

GET

## Endpoint URL

/user/logout

## Request Headers

Authorization: Bearer <token>

## Response Codes

| Status Code | Description                                        |
| ----------- | -------------------------------------------------- |
| 200         | OK: User logged out successfully.                |
| 401         | Unauthorized: Invalid or missing token.          |
| 500         | Internal Server Error: Indicates a server error.   |

## Example Success Response

```json
{
    "message": "Logged Out Successfully"
}
```

## Example Error Response

```json
{
    "message": "Unauthorized"
}
```

# /captains/register Endpoint Documentation

## Description

This endpoint is used to register new captains in the system. It requires specific captain details including vehicle information.

## Request Method

POST

## Endpoint URL

/captains/register

## Request Body

The request body should be in JSON format and contain the following fields:

```json
{
  "fullname": {
    "firstname": "string", // Required: Captain's first name.
    "lastname": "string"   // Optional: Captain's last name.
  },
  "email": "string",       // Required: Captain's email address.
  "password": "string",    // Required: Captain's password. Minimum 6 characters.
  "vehicle": {
      "color": "string",   // Required: Vehicle color. Minimum 3 characters.
      "plate": "string",   // Required: Vehicle plate. Minimum 3 characters.
      "capacity": "number",// Required: Vehicle capacity. Must be at least 1.
      "vehicleType": "string" // Required: Type of vehicle. Allowed values: 'car', 'motorcycle', 'auto'.
  }
}
```

## Response Codes

| Status Code | Description                                             |
| ----------- | ------------------------------------------------------- |
| 201         | Created: Captain successfully registered.             |
| 400         | Bad Request: Invalid input or captain already exists.   |
| 500         | Internal Server Error: Server encountered an error.     |

## Example Success Response

```json
{
    "token": "jwtToken",
    "captain": {
        "id": "uniqueCaptainId",
        "email": "captain@example.com",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "vehicle": {
            "color": "blue",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

## Example Error Response

```json
{
    "message": "Captain Already Registered"
}
```

# /captains/login Endpoint Documentation

## Description

This endpoint is used to authenticate captains and provide a token for accessing protected routes.

## Request Method

POST

## Endpoint URL

/captains/login

## Request Body

The request body should be in JSON format and include:

```json
{
  "email": "string",    // Required: Captain's email address.
  "password": "string"  // Required: Captain's password. Minimum 6 characters.
}
```

## Response Codes

| Status Code | Description                                          |
| ----------- | ---------------------------------------------------- |
| 200         | OK: Captain successfully authenticated.            |
| 400         | Bad Request: Invalid input.                          |
| 404         | Not Found: Captain does not exist.                 |
| 500         | Internal Server Error.                               |

## Example Success Response

```json
{
    "token": "jwtToken",
    "captain": {
        "id": "uniqueCaptainId",
        "email": "captain@example.com",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "vehicle": {
            "color": "blue",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

## Example Error Response

```json
{
    "message": "Captain Not Found or Invalid Password"
}
```

# /captains/profile Endpoint Documentation

## Description

This endpoint returns the profile details of the authenticated captain.

## Request Method

GET

## Endpoint URL

/captains/profile

## Request Headers

Authorization: Bearer <token>

## Response Codes

| Status Code | Description                                            |
| ----------- | ------------------------------------------------------ |
| 200         | OK: Returns captain profile details.                 |
| 401         | Unauthorized: Invalid or missing token.              |
| 500         | Internal Server Error.                                 |

## Example Success Response

```json
{
    "captain": {
        "id": "uniqueCaptainId",
        "email": "captain@example.com",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "vehicle": {
            "color": "blue",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
        // ...other captain fields...
    }
}
```

## Example Error Response

```json
{
    "message": "Unauthorized"
}
```

# /captains/logout Endpoint Documentation

## Description

This endpoint logs out the captain by clearing the token and adding it to a blacklist.

## Request Method

GET

## Endpoint URL

/captains/logout

## Request Headers

Authorization: Bearer <token>

## Response Codes

| Status Code | Description                                          |
| ----------- | ---------------------------------------------------- |
| 200         | OK: Captain logged out successfully.               |
| 401         | Unauthorized: Invalid or missing token.            |
| 500         | Internal Server Error.                               |

## Example Success Response

```json
{
    "message": "Captain Logged Out Successfully"
}
```

## Example Error Response

```json
{
    "message": "Unauthorized"
}
```
