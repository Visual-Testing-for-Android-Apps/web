# Visual Testing for Android Apps - Web Frontend

## Setup Instructions
Install the [latest stable](https://nodejs.org/en/) version of NodeJS  

Clone the repository  

In the root directory for the project, run the following  
```
npm install
```

To start the development server, run the following
```
npm start
```

Then navigate to `localhost:3000` in a browser  
Hot reloading is enabled, so changing a JSX file and saving should immediately be reflected without needing to refresh the page

## Environment Variables 
Environments variables are variables that are defined in build time. These variables can be accessed with 
```
process.env.YOUR_VARIABLE
```

### .env file
One purpose for this file is to define secret keys that should not be able to be seen by the user. 
Ensure .env file is NOT commited to the git repository (is not commited by default due to .gitignore).
Environment variables defined in the .env file should NOT be accessed in client-side code. If you need to use a secret key, send a request to the server (to define in server.js) and handle your secret key there.

An example of the current .env file is shown in .env.example.

Current Keys (ask originators for the key):
CAPTCHA_SECRET_KEY (Originator: Collins)
