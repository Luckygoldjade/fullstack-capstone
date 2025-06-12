# API Documentation

## POST /register
Content-Type: application/x-www-form-urlencoded

### Send a request with
- email - string
- password - string

### Get the following response:
- If Successful
    - response status 200 with User object

- If failed
    - response status 400 with error message

-----------------------------------------------------------

## POST /login
Content-Type: application/x-www-form-urlencoded

### Send a request with:
- email - string
- password - string

### Get the following response:
- If Successful
    - response status 200 with User object and token

- If failed
    - response status 401 with error message

-----------------------------------------------------------

## POST /password-reset-request
Content-Type: application/x-www-form-urlencoded

### Send a request with:
- email - string

### Get the following response:
- If Successful
    - response status 200 with an empty User object and null error

- If failed
    - response status 400 with error message

-----------------------------------------------------------

## POST /update-password
Content-Type: application/x-www-form-urlencoded

###  Send a request with:
- token - string
- password - string
 
### Get the following response:
- If Successful
    - response status 200 with an empty User object and null error

- If failed
    - response status 401 with error message

-----------------------------------------------------------

## GET /jobs
Content-Type: application/json

### Send a request with:
- token - string
 
###  Get the following response:
- If Successful
    - response status 200 with a list of the user's jobs

- If failed
    - response status 400 with error message

-----------------------------------------------------------

## POST /jobs
Content-Type: application/json

### Send a request with:
- token - string
- title - string
- benefits - string
- location - string
- url - string
- description - string
- date_posted - MM/DD/YY
- company_id - int
- skills - list of objects with skill name as the key and rating as the value
 
### Get the following response:
- If Successful
    - response status 200 with the created job

- If failed
    - response status 400 with error message

-----------------------------------------------------------

## DELETE /jobs
Content-Type: application/json

### Send a request with:
- token - string
- id - list of int (job id to delete)
 
### Get the following response:
- If Successful
    - response status 200 with a list of the user's jobs that were deleted

- If failed
    - response status 400 with error message

-----------------------------------------------------------

## PATCH /jobs
Content-Type: application/json

###  Send a request with:
- token - string
- title - string
- benefits - string
- location - string
- url - string
- description - string
- date_posted - MM/DD/YY
- company_id - int
- skills - list of objects with skill name as the key and rating as the value

###  Get the following response:
- If Successful
    - response status 200 with the updated job

- If failed
    - response status 400 with error message

-----------------------------------------------------------

## GET /skills
Content-Type: application/json

### Send a request with:
- token - string
 
###  Get the following response:
- If Successful
    - response status 200 with a list of object with the skill id and skill name

- If failed
    - response status 400 with error message

-----------------------------------------------------------

## POST /skills
Content-Type: application/json

### Send a request with:
- token - string
- name - string
 
### Get the following response:
- If Successful
    - response status 200 with the created skill

- If failed
    - response status 400 with error message

-----------------------------------------------------------

## DELETE /skills
Content-Type: application/json

### Send a request with:
- token - string
- id - list of int (skill id to delete)
 
### Get the following response:
- If Successful
    - response status 200 with a list of the skills that were deleted

- If failed
    - response status 400 with error message

-----------------------------------------------------------

## PATCH /skills
Content-Type: application/json

###  Send a request with:
- token - string
- name - string

###  Get the following response:
- If Successful
    - response status 200 with the updated skill

- If failed
    - response status 400 with error message