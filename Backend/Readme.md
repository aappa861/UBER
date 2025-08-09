# User Registration API Documentation

## POST /users/register

### Description
Registers a new user in the system by validating input data, hashing the password, and creating a user record in MongoDB. Returns a JWT token and user details on success.

### Request

#### Headers
```json
Content-Type: application/json