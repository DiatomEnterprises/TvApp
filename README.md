# OreganTV Setup instructions

* Follow setup instructions for your platform to install nvm (Node version manager) (https://github.com/creationix/nvm)[https://github.com/creationix/nvm]
* Install latest Node LTS `nvm install v8.9.0`
* Clone OreganTV repository: `git clone git@github.com:GuskiS/OreganTV.git`
* Navigate to OreganTV projects directory `cd OreganTV`
* Run `npm install`

# Running OreganTV ap

## Running application with animations
To run app with animations, enter following command: `ANIMATIONS=true npm run build && npm run express`
The app should be available at: `http://localhost:3000`

## Running application without animations
To run app without animations, enter this command: `npm run build && npm run express`
The app should be available at: `http://localhost:3000`



