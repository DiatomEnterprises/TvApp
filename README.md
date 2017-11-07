# TvApp Setup instructions

* For Node.js intallation we recommend using nvm (Node version manager). Follow setup isntructions for your target platform here: [https://github.com/creationix/nvm](https://github.com/creationix/nvm)
* Install latest Node LTS `nvm install v8.9.0`
* Clone TvApp repository: `git clone git@github.com:DiatomEnterprises/TvApp.git`
* Navigate to OreganTV projects directory `cd TvApp`
* Run `npm install`

# Running TvApp app

## Running application with animations
To run app with animations, enter following command: `ANIMATIONS=true npm run build && npm run express`

The app should be available at: `http://localhost:3000`

## Running application without animations
To run app without animations, enter this command: `npm run build && npm run express`

The app should be available at: `http://localhost:3000`
