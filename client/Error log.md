#To open rails server in another port, type this command - rails s -p 8000, where 8000 is the port number
    - I was wondering how rails and react will work in development when react uses 3000, which rails s also uses

#What's the difference between rails new . vs rails new . --api -T
    - it said rails new . --api -T installs rails api structure instead of the standard, what's the standard?
    - I installed the standard one and it didn't have the gem rack cors, should I just do the api structure one
    - oh, I guess I can just type it and do bundle install?
    - I guess to install gems, you type gem x, and bundle install?
    - okay, nevermind, I did the standard structure and the files needed for the tutorials aren't there

#Connecting react app and rails api
    - my set up is react frontend and rails api
    - so my problem is that if I run the react and rails in development, both by default are served? on port 3000
    - I also had to deal with CORS
    - so set up is in react, add - "proxy": "http://localhost:8000" in package.json
    - in rails, change the default port number to 8000, add gems cors in the gemfile, then bundle install, configure cors.rb
    - test by making a fetch request from react app to a simple route in rails api, make sure that react app is receiving an object and rails is sending an object
    - so what all this is doing is configuring react to direct the requests to port 8000, otherwise, it will look at the paths internally
    - also, it is configuring rails to accept requests from port 3000, the code in cors.rb, that is

#I haven't been importing react in the components that I have been making
    - I thought they were just functions that gets imported into another function, which gets imported into index.js, which actually does the actual rendering
    - however, I've been noticing that my auto imports aren't working
    - when I import react, I do get the lightbult right click auto import
    - what does it actually do though?
    - importing ReactDOM makes the render method accessible, what about react?
    - I'm just curious because, before, my apps worked without needing to import react
    - do I have a stricter typescript setting this time around?
    - In the past, I've just been able to type in components and it imported the components for me
    - So, I searched it, you import React from react to translate the JSX to React.createElement()
    - React makes createElement method accessible
    - However, this was updated so that you don't have to anymore, import React is built in the JSX

#I forgot how to do customized components from routes where you supply paramaters
    - I had this originally
    - <Route exact path="images/:id">
    - the right answer is 
    - <Route exact path="/images/:id" component={Image} />
    - here you're saying when the url in the address matches /images/:id, render the Image component

#Ok, I have an error in the custom route
    - when I click on the thumbnail, I'm expecting to go on the detail image page
    - images/1 will display Image.first
    - images/2 will display Image.second
    - however, when I made a fetch call, this is what is being returned
    -{status: 404, error: "Not Found", exception: "#<ActionController::RoutingError: No route matches [GET] "/images/images/1">", traces: {…}}
    - my fetch request in the image component was 
    - fetch(`images/${id}`)
      .then((res) => res.json())
      .then((x) => setImage(x.image));
    - I thought I was making fetch request to images/1
    - hmmm, is the id evaluating to images/1 so when I make a fetch request to images/id, it becomes images/images/1?
    - Oh, I get this error when I'm making a get request when I'm already on /images/1
    - I get the image when I'm making a get request from / or /images
    - hm
    - so I continuously clicked on the thumbnail link and it made the href in the anchor tag as 
    - images/images/images/images/images/images/images/images/images/1
    - I need to fix that
    - so maybe that is why routes isn't rendering the image, the url doesn't match the path specified?
    - ok, so I just searched url parameters in react router
    - I maybe used an outdated form when using match object?

#Ok, redo
    - in the example, the route is using children attribute
    - I just had component attribute

