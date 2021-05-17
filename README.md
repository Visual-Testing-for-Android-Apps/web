## Visual Testing for Android Apps - Web Frontend

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
Environments variables are variables that are defined in build time. There are two ways to set up environment variables

## Within your local machine
These variables are defined within your local machine and can be accessed with 
```
process.env.YOUR_VARIABLE
```
Setting up environment variables depend on your OS. Please search online on how to create and edit environment variables on your machine.

Current Environment Variables:
UPLOAD_SERVICE_HOST (Originator: Damien) (if running in local server, you should set it to 'http://localhost:3000')
SERVER_HOSTNAME (Originator: Collins) (if running in local server, you should set it to 'http://localhost:3000')

## .env file
One purpose for this file is to define secret keys that should not be able to be seen by the user. 
Ensure .env file is NOT commited to the git repository (is not commited by default due to .gitignore).
Environment variables defined in the .env file should NOT be accessed in client-side code. If you need to use a secret key, send a request to the server (to define in server.js) and handle your secret key there.
Variables defined in the .env file must be prefixed with REACT_APP_ to be able to be accessed in your code. To then access these variables, use
```
process.env.REACT_APP_YOUR_VARIABLE
```
An example of the current .env file is shown in .env.example.

Current Keys (ask originators for the key):
REACT_APP_CAPTCHA_SECRET_KEY (Originator: Collins)
