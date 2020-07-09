# `Travel Wallet`

[See the deployed site here]()

## Table of contents

- [Introduction](#introduction)
- [Goals](#goals)
- [Technologies](#technologies)
- [Demo](#demo)
- [Project User Stories and Wireframe](#project-user-stories-and-wireframe)
- [Server Repository](#server-repository)
- [Available Scripts](#available-scripts)

### Introduction

Travel Wallet is an app to help people to keep track of their expenses while traveling solo or in a group. This App also provides the group share and split bills options. Travel Wallet lets you see how much money you spent, and how much you still have in your budget. People can also see the statistics of each category of expenses.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Goals

My goal for this project was to build a full stack app using the technologies learned in the bootcamp and also exploring new ones by going through the documentation.

- Practice full-stack app development
- Apply what we learned in Codaisseur's bootcamp
- Practice learning new technology independently
- Showcase development approach of using wireframes and user stories
- Practice disciplined git usage like proper commits & branching.

I plan to continue working on this app, using it as a platform to explore new technologies and expand my current knowledge of web app development.

### Technologies

- [React](https://github.com/sowjanyam27/travel-wallet-client/blob/development/src/App.js)
- [Redux](https://github.com/sowjanyam27/travel-wallet-client/tree/development/src/store)
- [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/)
- [Formik](https://github.com/sowjanyam27/travel-wallet-client/blob/development/src/pages/AddExpense/AddExpense.js)⭐️
- [Express](https://github.com/sowjanyam27/travel-wallet-server/blob/development/index.js)
  - REST (https://github.com/sowjanyam27/travel-wallet-server/blob/development/routers/trip.js)
- [Sequelize](https://github.com/sowjanyam27/travel-wallet-server/blob/development/models/trip.js)
- [Nodemailer](https://github.com/sowjanyam27/travel-wallet-server/blob/development/routers/email.js)⭐️
- [multer](https://github.com/sowjanyam27/travel-wallet-server/blob/development/routers/trip.js)⭐️

⭐️ New technologies learned during this project.

### Demo

![home](https://user-images.githubusercontent.com/56592518/86966781-03a41300-c16a-11ea-99be-dca49df9a561.png)
![trips](https://user-images.githubusercontent.com/56592518/86966906-27675900-c16a-11ea-9d10-996cab26d555.png)
![details](https://user-images.githubusercontent.com/56592518/86967422-e6237900-c16a-11ea-8a85-bf8ebf38eddc.png)
![addExpense](https://user-images.githubusercontent.com/56592518/86967004-4d8cf900-c16a-11ea-8595-c5dc8b14b396.png)
![stats1](https://user-images.githubusercontent.com/56592518/86967035-58478e00-c16a-11ea-8abb-e3b183e2ecd0.png)

### Project User Stories and Wireframe

- User Stories

  - As a person who wants to track the expenses should be able to login/signup to use the features of this app.
  - As a person who wants to keep track of expenses should see the list of all my previous trips
  - As a person who wants to track expenses, I want to add a new trip
  - As a person who wants to share expenses, I can add friends to this trip, so that friends can also see the trip details in their account.
  - As a person who is sharing the trip, I can upload the picture to the trip
  - As a person who wants to know the financial information should see the expenses for that particular trip
  - As a person who is sharing the expenses, I want to add expenses to a shared trip, so that friends can see who paid for it.
  - As a person who is sharing the trip should be able to delete the expense added.
  - As a person to keep tracking the expenses, I want to see the statistics of the money spent, so that I can plan accordingly.
  - As a person who is sharing the expenses, I can see who owes and who gets back money, so that we can settle it.
  - As a person who is sharing the trip should send an email to others who are sharing the trip

- Wireframe \*[Travel Wallet Wireframe](https://wireframepro.mockflow.com/view/M23e7fb5dfa23af0b0d580c1f87e33e321593268948906)

### Server Repository

The repository for the backend can be found [here](https://github.com/sowjanyam27/travel-wallet-server). This is a RESTful API using Express.js. The database is built using Postgres. [Here](https://app.lucidchart.com/invitations/accept/3378942f-0f45-460a-a368-dd1c76b04b05) is the data model. Object-relational mapping is done using Sequelize.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
