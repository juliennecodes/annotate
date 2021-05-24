# Annotate - app for annotating images

Annotate is an app where a user can annotate images. The user adds an image to the app and once added, it can then be annotated. The user draws on the image and writes an accompanying comment. Once the annotation is submitted, the user can view the annotated version of the image.

## Goals and Objectives
The goal of this project was to apply the lessons learned from All Aboard Bootcamp to make an app. Annotate put together skills I have learned from past projects and new tools I have learned from the bootcamp. Previous knowledge of client-server communication was combined with Rails server and database resulting in the beginnings of a working app.

## Setup

### Set up server
- go to project folder
- go to server
- type command - bundle install
- type command - rails db:migrate
- type command - rails db:seed

### Set up client
- go to project folder
- go to client
- type command - npm install

## Running the App Locally
### Start the Server
- go to project folder
- go to server
- type command rails s

### Start the Client
- go to project folder
- go to client
- type command - npm start

## Deploy App in Heroku
### Build Minified React App
- go to project folder
- type command - npm run build
- copy the contents of build folder
- paste the contents of build folder in public folder of the server
  - project folder > server > app > public

### Deploy
- type command - heroku create
  - creates an empty heroku app - https://gentle-everglades-42381.herokuapp.com/
  - creates an empty git repository - https://git.heroku.com/gentle-everglades-42381.git
- type command - git subtree push --prefix server heroku main
  - this command is used because the code that will be pushed to heroku is in a subdirectory of project folder

## Redeploy Updated App
- make changes to the app
- go to project folder
- go to client
- type command - npm run build
- copy the contents of build folder
- paste the contents of build folder in the public folder
  - project folder > server > app > public
- go to http://localhost:8000/ to check if the server is serving up the minified react app
- commit changes to GitHub
- push changes to GitHub
- go to project folder
- type command - git subtree push --prefix server heroku main
