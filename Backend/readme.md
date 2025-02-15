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
