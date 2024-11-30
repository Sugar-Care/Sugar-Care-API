# Sugar-Care-API
# Api Documentation
## Endpoints

### 1. Register

**URL:** `/register`  
**Method:** `POST`  
**Description:** Register a new user  
**Request Body:**
```json
{
    "name": "string",
    "username": "string",
    "password": "string"
}
```
**Example Response:**
```json
{
    "message": "User successfully registered"
}
```

### 2. Login

**URL:** `/login`  
**Method:** `POST`  
**Description:** Login a user  
**Request Body:**
```json
{
    "username": "string",
    "password": "string"
}
```
**Example Response:**
```json
{
    "error": false,
    "message": "success",
    "loginResult": {
        "name": "Example",
        "email": "example@gmail.com",
        "token": "eyJdsbGcasdagiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCIjhgbcvcbvlc3Nzc0BnbWFpbC5jb20iLCJpYXQiOjE3MzI5MzE2OTksImV4cCI6MTczMzUzNjQ5OX0.aPdfgasdZlax-Df7c_l8anMxg-mhs14nAaGe4xYERmoiC4A"
    }
}
```
