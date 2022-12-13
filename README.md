![alt text](/public/MyKitchenLogo.png)

# My Kitchen

## Description

Do you know what meal your going to prepare today? Just tell us what you have, and we will tell you what to prepare and enjoy!  
We chose this app as a way to showcase our talents as well as put out a way for users to get recipes, track nutrition and keep track of favorite meals found through our app.

## Languages and main Tech Stack   
Javascript   
HTML   
CSS    
Node with Express.js   
React   

There are two repos.    
The back-end which includes the front-end as a submodule [link here](https://github.com/Code-the-Dream-School/MyKitchenApp-back) and this separate repo here is for the front-end.    
(Instructions for the submodule are located in the back-end repo README.md)    

### Build by [Elena](https://github.com/elenamagay), [Nuriye](https://github.com/nuriyealp), [Xeniya](https://github.com/XeniyaDob), [Dahlak](https://github.com/Dahlak76)

### Mentors John McGarvey, Vaidehi S
### Elena --


### Nuriya --


### Xeniya --

Dashboard, Navbar, Single recipe, and Favorite page.      
 -Used API's GET/POST/DELETE methods, Like/Unlike a recipe function.    
 -Loader component and Google Visualization Pie Chart.    
 -Responsiveness of corresponding pages.   
### Dahlak -- 

-Back-end: server, API, middlewares, routing and DB. (All folders/files)  

-Front-end: Google Auth for third-party sign-in feature. (Google.js, README.md)  

  
## Getting Started  
#### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Clone repo locally    
Run 'npm install' to install dependencies   
Run 'npm run start' to compile webpack  

## .env (backend only)   
MONGO_URI=  (https://account.mongodb.com/)    
JWT_SECRET=  (https://jwt.io/)   
JWT_LIFETIME=24h    
apiKey= [Apply from spoonacular.com](https://spoonacular.com/food-api)    
#### (Google Auth keys in .env)      
CLIENT_ID=  (https://cloud.google.com/)    
CLIENT_SECRET= *same link as client id      
CALLBACK_URL=http://localhost:3002/auth/google/callback     

### Deployment    
(https://render.com/)    

## APIs

Check route

- GET `/`

Check if the user is logged in

- GET `/checkUser`

Register a user

- POST `/api/v1/auth/register`
- Body: required
  - name
  - password (minimum 8 characters)
  - email (syntactically valid email)

Log in a user

- POST `/api/v1/auth/login`
- Body: required
  - email
  - password

### All the `/recipes` endpoints requires Authentication

Get recipe by query

- GET `/api/v1/recipes`
  (this is the 'search recipe' endpoint in the spoonacular docs)

Get individual recipe by recipe id

- GET `/api/v1/recipes/:id`
  (this is the 'get recipe information' endpoint in the spoonacular docs)

Get saved recipe list

- GET `/api/v1/recipes/list`

Save recipe item to users profile

- POST `/api/v1/recipes/list`
- Body: required
  - recipeId
  - title
  - image
  - imageType

Delete recipe from saved list

- DELETE `/api/v1/recipes/:id`

Get a random recipe

- GET `/api/v1/recipes`

  - takes in a number 1-100 for how many recipes are returned and also takes in a string
    can be any of these options - diets, meal types, cuisines, or intolerances

Remove active user from DB

- DELETE `/api/v1/auth/remove`

Change the password to a new password

- PATCH `/api/v1/auth/changePassword`
- Body: required

  - password (the old one),
  - newPassword (the new one)

  Success: returns a message "password changed"

  Failure: returns 'please provide password and new password' or 'invalid credentials'

Get a randomly generated recipe

- GET `/api/v1/recipes/random`

  Always the same for a given day. Do not put in an option for query.  


  # move to presentation slides then delete ***below this line 

  ## Tech Stack
Front-End: 

  React with Hooks: for the entire front-end       
  React Router: for routing      
  React minimal-pie-chart: for the nutrition chart      
  MUI and Styled-Components: for styling     
  Jest: for testing     
  Axios: for HTTP requests    
  Google Auth: for third-party authentication     
  JWT-Decode: for decoding JWT tokens     



Back-end:   
  Node.js with Express.js: framework for the server     
  MongoDB with Mongoose: as an Object Data Modeling (ODM) library for our DB     
  Google Auth: for third-party authentication     
  JWT: for our client-side used for authentication     
  CORS: for managing cross-origin access     
  XSS-Clean: to sanitize user input     
  http-status-codes: for status code responses     
  Bcryptjs: as a password hashing middleware for local authorization (username/PW) 
