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

#Ok, so what do I want to happen
    - homepage component is rendered when url is /
    - images component is rendered when url is /images
    - image component is rendered when url is /images/:id
    - how do I go about doing that?
    
#Actually, I wonder if not using api/v1 is causing problems
    - Is making a fetch request to "/images/:id" (BE) conflicting with Link to "/images/:id (FE)
    - it shouldn't right? one is making a request to port 8000, one is just checking the url in the address bar
    - hmmm

#Okay, so I hardcoded to see if route is working
    - this works
    - <Route path="/x" component={Image}></Route>
    - when the url is /x, Image component is rendered

    - this works, so, two slashes is fine
    - <Route path="/strawberry/milk" component={Image}></Route>
    - when the url is /strawberry/milk, Image component is rendered

    - this works too, so, you can customize parameters can make general components into specific component
    - <Route path="/:x" component={Image}></Route>
    - it works in conjunction with the Image component like so
    -   export function Image({ match }) {
            const x = match.params.x;
            return (
                <div>
                <h1>Image page</h1>
                <p>{x}</p>
                </div>
            );
        }
    - so in route path :x is customizable
    - :x can be anything, it can be strawberry, it can be caramel
    - /:x matches strawberry, render Image component
    - /:x matches caramel, render Image component
    - so, when route renders image component, it passes the image component a match object
    - match object contains params, whose property x, captures the value of :x
    - /:x in /strawberry - x is strawberry
    - /:x in /caramel - x is caramel
    - so in this case, demonstration, the mechanism of passing in a value from routes to the image component does work
    - match is given to the image component
    - image component can use that information
    - here, I've used it in the p element

    - this one works too, I tried two slashes with customizables
    - <Route path="/strawberry/:x" component={Image}></Route>
    - when I typed in /strawberry/milk, the Image component rendered milk, because :x becomes milk, and image component is rendering x, which becomes milk

    - I tried it with /strawberry/1 and image component rendered 1
    - oh, I wonder if type has anything to do with it. Is 1 in params a string and maybe the server wants a number?
    - Ah!
    - I tried to render this       <p>{x + 100}</p>
    - if 1 is a number, the output would be 101
    - however, the output was 1100
    - this is because it is adding "1" and turns the number 100 to "100" to make sense of the addition
    - ok, cool
    - mystery solved
    - turn the params into a number?

    - nevermind, I just looked at the code again and fetch is making a request to a string path so it shouldn't matter because the value gets converted into a string anyways

#Ok, so I hardcoded where the fetch request is directed
    - fetch(`/images/1`)
    - this one renders the image component with Image.first because the server sends Image.find_by(id: 1)
    - so the server sends the right object back
    - the client renders the image using the information received from the server
    - I guess the problem is in configuring where the request is being sent?
    - Ah, I solved it! 
    - the problem was I didn't put exact
    - so I had two routes, one is /images and one is /images/:x
    - because /images comes first, whenever I type images/1, the route /images renders its component because it matches enough
    - if I specify that it has to match exactly, then images/1 won't match /images
    - therefore, it would move on and be able to see the route for /images/:x
    - images/:x matches images/1
    - x becomes 1, image component gets rendered and it gets the information 1, which it uses for its fetch request

#hm, this is odd
    - okay, so here are the moving parts in route parameters
    - route parameter gets a specified value
    - route parameter renders a component
    - route parameter passes in the specified value to the rendered component
    - rendered component can use the specified value
    - so why can't I use it for the fetch request?
    - ok, I'm going to go through these steps one by one
    - so I went through them it did work
    -   export function Image({ match }) {
        const x = match.params.x;
            console.log(`x is ${x} and type of x is ${typeof(x)}`);

            return (
                <div>
                <h1>Image page</h1>
                <p>{x + 100}</p>
                </div>
            );
        }
    - in images/100, route parameter gets 100, a specified value, image page is rendered as the Image page heading shows, the specified value, 100, is passed to the rendered component as the console log, x is 100 and type of x is string, shows. The information can also be used by the rendered component as the p element shows.
    
    - so is the problem in the fetch request?
    - images/1 returns the right image
    - I guess I wrote something wrong when I'm interpolating?
    - ah! I was using id in the image component when the customizable parameter was x
    - I was interpolating id but the customizable paramater was x

#I added the ability to post an image. However, I'm not sure if it's being handled properly.
    - so the post request directed to /images and is being handled by the images controller using the action create
    - it creates a new record in the database using the information posted by the client
    - however, when it comes to send a response back to the client, it seems that it is not reaching it?
    - I had the client configured to console log the message but there are no console logs
    - I thought fetch requests always have to be handled, which is why there are chained then calls
    - I don't know what the protocol is for action create

#After I submit the form, there is a question mark in the address bar, what is that?

#Okay, so problem with delete
    - {status: 404, error: "Not Found", exception: "#<ActionController::RoutingError: No route matches [DELETE] "/images/images/9">", traces: {…}}
    - when it does params[:id], the way I configured it currently, rails gets the url information
    - I think I have to post the id
    - can a delete method have a body?
    - ok, so I added a body to the delete method so I can give the server information
    - however, I'm getting the error
    - I think it is maybe because I'm using id as the name of the property
    - maybe when rails sees id, it goes by convention which is the url

    - hm, so in rails
    - Started DELETE "/images/images/9"
    - ActionController::RoutingError (No route matches [DELETE] "/images/images/9")
    - what does this mean? does this mean that the delete request is directed to images/images/9 or does it mean that rails got the id of images/9

    - ok, I'm going to hardcode
    - so I hardcoded the client side and it shows the same behaviour
    - the delete request couldn't have been directed at images/images/9 because I specifically put images/9

    - I'm going to hardcode the server side now
    - I hardcoded the server to delete image 9 when the button is pressed
    - however, I still got the same error
    - In case the code was faulty, I typed the code in directly to rails console
    - that deleted the image

    - so maybe it is the button that is the issue?
    - I'm so confused

    - I typed in the fetch request in the chrome console and got this error
    - NoMethodError (undefined method `destroy' for nil:NilClass)
    - however, I typed in the code in the rails console and it worked
    - so the fetch request is faulty
    - if rails is being asked to destroy something nil, then that means that rails isn't able to find the image by id, which means that the id supplied by the fetch request isn't being given properly
    - oh, nevermind, rails was being asked to destroy an already deleted image, I hardcoded the server earlier

    - I typed in hardcoded information in the chrome console and that deleted the image
    - I'm using proper code in the server
    - so the server is working
    - the problem is in the fetch request

    - ok, so the problem is I'm deleting from the image page
    - writing the delete request in the console from the images page deletes the image
    - writing the delete request in the console from the actual image page errors out
    - writing the delete request in the console from a different image page errors out
    
    - I guess I can kind of see why but not really
    - I need to think about this more
    - for now, I'm just going to create a new route
    - I think maybe because destroy method has some conventions that I'm not meeting
    - I'll get back to this

#think about params
    - when is it url
    - when is it request body

#what is good practice in terms of the adding something in the dependency array
    - I added image in the dependency array so the ui will be updated when that image is deleted. However, as a result, react ends up making a lot of get requests to the server. Is that fine? Is that bad practice?

#should I redirect after image is deleted or just display image is deleted?
    - I think I should redirect
    - how though?

    - history object is passed down by prop
    - history object can control the history of the browser
    - so I added history.push("/images) to redirect the user after an image is deleted
    - it works but I had to pass down history through a lot of components
    - have to do something about that

#Problem with relative paths
    - when I'm on image page, when I'm trying to add a new image, the url is redirected to /images/new-image-form
    - I guess this is why I've been getting errors when trying to delete from the image page?
    - the paths are relative so when I'm on image page and I'm making a delete request to /images/10, the path evaluates relative to the current url so the delete request gets directed to /images/images/10?

    - notes on paths
    - absolute path is always appended to the domain
    - i.e to="/images" means x.com/images
    - Link to is always treated as an absolute path 

    - to use relative paths, use match.url
    - i.e to=`${match.url} + /images`
    - match.url is the page you are currently on
    - adding a path to it creates a relative path

    - hm, why is my path behaving relative then? isn't it supposed to behave like an absolute path?

    - oh, I didn't write the / in front
    - I guess if you don't, the path becomes relative?
    - if you do, the path becomes absolute?

    - I just checked my delete request, it didn't have / in the front
    - is that why the paths were evaluating as /images/images/10?

    - I added the / and tried it
    - it works now!

#Should I add annotations in the dependency array? 
    - I was hesitant because it makes a lot of calls to the server
    - however, I'm not redirecting after deleting annotations
    - I have to refresh manually to see the changes
    - I guess I'll add it for now
    - I removed it
    - I think another solution would just be refreshing the page for the user using the history object again

#when writing tests, keep to what the user sees
    - i.e user adds a new image and image is added -> then just prove that
    - I started writing out the test by typing user fills out form and was thinking what should happen when that action is taken. I was thinking how can I prove that the data is submitted, should I have the mock server send back an object that has the new added image
    - however, that didn't seem right
    - it became clearer when I typed that I should keep it simple, and just test what the user sees
    - the user doesn't need to concern themselves with what the server is sending
    - the user is only concerned with what is tangible on the page

#I had a problem with the mock server
    - I was returning objects that I think would be returned if a request is made to that endpoint
    - however, I was simulating user interaction and I had conflicts where I was trying to add a new image but the get endpoint to all images always returns the same object regardless of what action happened to other endpoints.
    - so I had to rewrite the mock server in a way that behaves like the actual server

#To select input fields, give them aria labels
    - then in tests, to find the input elements, use getByLabelText

#Error: Not implemented: HTMLFormElement.prototype.submit
    - I tried this
    - jest.spyOn(HTMLFormElement.prototype, "submit").mockImplementation(() => {});
    - it didn't work
