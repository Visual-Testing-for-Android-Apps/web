# Visual Testing for Android Apps - Web Frontend

## Setup Instructions

Install the [latest stable](https://nodejs.org/en/) version of NodeJS.

Clone the repository

```bash
git clone https://github.com/Visual-Testing-for-Android-Apps/web
```

In the root directory for the project, run the following

```bash
npm install
```

To start the development server, run the following

```bash
npm start
```

Then navigate to [localhost:3000](localhost:3000) in a browser

## Environment Variables

Environments variables are variables that are defined in build time. these are store in `.env` file, which looks like this:

```
CAPTCHA_SECRET_KEY=
OWLEYES_ENDPOINT=
SEENOMALY_ENDPOINT=
BATCH_JOB_ENDPOINT=
BATCH_JOB_REPORT_ENDPOINT=
```

In the source code, they can be accessed with

```
process.env.YOUR_VARIABLE
```

One purpose for this file is to define secret keys that should not be able to be seen by the user.

Ensure .env file is NOT commited to the git repository (is not commited by default due to .gitignore).

Environment variables defined in the .env file should NOT be accessed in client-side code. If you need to use a secret key, send a request to the server (to define in server.js) and handle your secret key there.

An example of the current .env file is shown in `.env.example`.

Current Keys (ask originators for the key):
CAPTCHA_SECRET_KEY (Originator: Collins)

## Run using docker

Please make sure you have a valid `.env` file

```bash
docker run -ti --rm --init -p 3000:3000 --env-file PATH_TO_ENVFILE mtempty/vision:latest
```

Then navigate to [localhost:3000](localhost:3000) in a browser
