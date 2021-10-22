# Visual Testing for Android Apps - Web Frontend

VISION is an application which allows users to upload screenshots and short videos of an Android application to be scanned for visual defects.

VISION integrates two computer vision ML models [Seenomaly](https://github.com/DehaiZhao/Seenomaly) and [Owleyes](https://github.com/franklinbill/OwlEye).

Built using [React](https://reactjs.org/) and [Node.JS](https://nodejs.org).

![](/showcase.gif)

## Setup Instructions

First, setup the backend dependencies otherwise functionality will be limited. Instructions can be found [here](https://github.com/Visual-Testing-for-Android-Apps/backend).

Install the [latest stable](https://nodejs.org/en/) version of NodeJS.

Clone the repository with:

```bash
git clone https://github.com/Visual-Testing-for-Android-Apps/web
```

In the root directory for the project, run the following:

```bash
npm install
```

Setup a `.env` file with the environment variables populated.

To start the development server, run the following:

```bash
npm start
```

Then navigate to [localhost:3000](localhost:3000) in your browser.

## Environment Variables

Environments variables are stored in `.env` file, which has the following variables:

```
BATCH_JOB_ENDPOINT - enpoint for submitting a batch job
BATCH_JOB_REPORT_ENDPOINT - endpoint for retreiving batch job results
CAPTCHA_SECRET_KEY - ReCaptch v2 secret
OWLEYES_ENDPOINT- Endpoint for OwlEyes model (Live job)
SEENOMALY_ENDPOINT - Endpoint for Seenomaly model (Live job)
```

For the React portion of the application, these variables are baked in at compile time using webpack's [Define plugin](https://webpack.js.org/plugins/define-plugin/). See webpack.config.js for the defined variables and how to reference them in code.

For variables defined for the Node.JS portion of the application, these can be referenced directly in code using

```
process.env.SOME_ENVIRONMENT_VARIABLE
```

An example of the current .env file is shown in `.env.example`.

### Special environment variables:

- CAPTCHA_SECRET_KEY - This key is the secret for Google ReCaptcha v2. You can generate one by registering a new site at [Google ReCaptcha](https://www.google.com/recaptcha/about/)

## Deploying the application

The repository doesn't contain build files. It is expected that when the site is deployed, it will be built on the server. This means that environment variables need to be configured on the server as well.

Building and running the application in production mode can be triggered by running:

```bash
npm run start-server
```

## Run using Docker

Please make sure you have a valid `.env` file, then run the follwing:

```bash
docker run -ti --rm --init -p 3000:3000 --env-file PATH_TO_ENVFILE mtempty/vision:latest
```

Then navigate to [localhost:3000](localhost:3000) in your browser.

## Versioning strategy

Versioning will follow the semantic version strategy documented [here](https://semver.org/).

## Future work

Some of these require backend functionality to be implemented as well

- [ ] Report download functionality
- [ ] APK support
- [ ] Provide example files for trialing software
- [ ] Automatically split up larger videos into shorter videos and screenshots

## Contributing

Contributions are most welcome!

Before opening a PR:

- Make sure that there isn't an active PR already open which makes the same changes
- Make sure to check if there are issues related to your PR
- Follow our [project wide guidlines](https://github.com/Visual-Testing-for-Android-Apps/Project-guidelines)
- Follow the PR template
