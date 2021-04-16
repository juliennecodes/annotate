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
    - so the problem is html form wants to submit on its own. However, javascript is the one submitting
    - so, to prevent html form from submitting, write e.preventDefault();
    - I decided to use another solution, which was using fireEvent.submit(formElement)

#I needed to get a reference to the form element but didn't want to use test id
    - I tried to getByRole("form")
    - the test was unable to find an accesible element with the role form
    - I searched it and I guess that is by design?
    - Although the form does already have the role form, it isn't accessible if it doesn't have a label
    - so to get a reference to the form when testing, add aria-label, which you will use to query for the element
    - so I did, getByRole("form", {name: "form-name"})
    - that worked
    - however, this also works, getByRole("form")
    - when I read you have to add aria-label, I thought it meant that you need it to select the form
    - perhaps, that is also the case where a page has multiple forms
    - however, it seems the aria labels are there more for the test to recognize the form
    - getByRole("form") by itself gets the element provided it has an aria label
    - getByRole("form") without the aria label does not return the element

#I'm cleaning up code and should move this here, it's more on what the server is sending. I actually don't know if this is just mock server thing or an actual server thing
    - since this was just a server reset and I didn't really need to send an object to the app,
    - I originally left out ctx.json()
    - however, I got an error about unexpected end of json input
    - so I guess it is necessary?
    - this was on the mock server

#I still have to find out how to just send status code responses
    - for methods like create and destroy, the server doesn't really need to send objects back to the client

#So, I think the front end is working fine. I'm capturing the information and keeping them in a state.
    - I have a state that keeps track of what the user wrote in
    - I have a state that keeps track of what is drawn on the canvas
    - however, I'm getting an error when posting to the server
    - I console logged the image annotation and text annotation, it seems to be right
    - however, when I query for the latest annotation, the annotation doesn't get created
    - I did create an annotation with just the text and that works
    - however, when I add the string information of what was drawn on the canvas, the annotation doesn't get created
    - I did get an error message though
    - ActiveRecord::AssociationTypeMismatch (Image(#18300) expected, got "data:image/png;base64,iVBORw...BS3+LTpAAAAAAElFTkSuQmCC" which is an instance of String(#2640)):
    - what does - Image(#18300) expected - mean?
    - does that mean that rails knows data:image is an image and it is raising an error because I configured the annotations table to have image as :string?
    - should I have image as :image?
    - I thought it should be string because canvas.toDataURL() returns a string
    - is there even an :image type?
    - so I tried creating the annotation directly in the rails console, I got the same error
    - so post request isn't the issue, it's actually creating a record in the database that is the issue

#ActiveRecord::AssociationTypeMismatch
    - so I looked it up
    - raised when an object assigned to an association has an incorrect type
    - so is it complaining because of images has many annotations?
    - or is the error about annotations model?
    - okay, so I tried to create annotation directly on the rails console
    - instead of using the canvas.toDataURL(), I used a working link
    - however, that produced an error too
    - so, it isn't the canvas.toDataURL() that is the problem
    - I mean it might be an error, but it isn't the one causing the mismatch error
    - so I created an annotation directly in rails console, this time, I left out writing the image annotation, it worked
    - so adding image annotation raises an error
    - so why?
    - I looked at the schema and the annotations model has image annotation
    -   create_table "annotations", force: :cascade do |t|
            t.string "text"
            t.integer "image_id"
            t.string "image"
        end
    - I don't understand
    - what does image expected mean?

#So I updated the column directly and gave it a string
    - that worked
    - however, when I tried to create an annotation with the same values, I got the same error

#So I guess the error was because image column is already taken
    - I thought the extent of association between annotations and image was just through image id
    - however, it seems that I can refer to the image the annotation belongs to through annotation.image
    - as such, the image column I created to house the information drawn on the canvas is conflicting with an implied column?
    - annotation, through rails, has a pseudo column containing the information about the image it belongs to
    - I thought the extent of this was image_id, I didn't know it had access to the whole image
    - okay, time to rename the columns

#I tested whether the canvas information is transparent or not. It is.
    - I gave body the background colour pink
    - if canvas information was not transparent, a white box would have appeared
    - if it was transparent, the background colour would show through
    - the background colour showed through
    - yay

#add event listeners directly in the elements in react
    - from react docs - when using React, you generally don’t need to call addEventListener to add listeners to a DOM element after it is created. Instead, just provide a listener when the element is initially rendered

#how do you set up multiple event listeners in one element?
    - oh? you can have multiple onEvent listeners in one element?
    - has that been the case always?
    - why did I think you can have only one onClick
    - I thought html elements can only have one onEvent listeners
    - actually, what I want to do is if it is mousedown, and it is mousemove, draw
    - how do you pass mousemove to mousedown
    - set a state?

#I had a problem with mouse move event handler
    - mouse move event handler had to be aware of mouse down event
    - however, the event passed to mouse move event handler concerns the mouse moving not the mouse down event
    - the answer was to keep the mouse down event information in a state
    - in this case, mouse move needed to know whether the mouse button was pressed
    - if pressed, continue to draw
    - if released, stop drawing
    - since the mouse move was only aware of the mouse move event, mouse down event had to be kept in a state
    - that way, mouse move can have the mouse down event information
    - an event listener was added to the canvas, if the user clicked on the canvas, the state of whether the mouse button was down was set to true
    - another event listener was added to the canvas, if the user released the mouse button, the state of whether the mouse button was down was set to false
    - that way, mouse move handler had access to whether the mouse button was down or not
    - if down, draw continuously
    - if up, stop drawing

#look into new image form, I'm not sure if the server response is registering
    - I mean it creates a new image record but I had a console log to handle the promises and the console isn't logging
    - I'm also not sure about what's happening in the address bar
    - are the parameters supposed to remain there?
    - this is what the console says
    - [HMR] Waiting for update signal from WDS...

#I changed the server response from render json to head :no_content and it seems that the server response is not being handled
    - it seems like the server is doing its own thing
    - however, I guess because there is no body, there is nothing to extract from the server response?
    - so maybe that is why it is not reaching the reload code?
    - so I moved the reload to where I normally do res.json(), however, I still have to click the button twice to get the page to reload
    - maybe I'll revert to the old version for now, where I'm sending a json object back to the client even if that json object goes unused

#I'm getting this error when adding a new image
    - Proxy error: Could not proxy request /images from localhost:3000 to http://localhost:8000.
    - maybe it has to do with the html form submitting? I'll add e prevent default for now

#I had three states for the image page. However, if statements don't work in the return statements
    - I tried ternary operator inside ternary operator and it worked
    - ternary operator only has two choices, which posed a problem since I had three states to choose from
    - what I did was have one ternary operator for one of the choices
    - so the choices were A : B or C

#The code inside the ternary operator was getting a bit too messy and I wanted to tidy it up. 
    - however, I wasn't sure whether creating new components outside of the function and having to pass it objects was any better.
    - I tried creating bindings within the component itself so that the information needed would  be in scope
    - it worked

#I was setting the canvas size according to the image size. However, the canvas is 10px bigger than the image, presumably because the border is 5px
    - I expected it to be the same size because I set box-sizing to border-box
    - for now, I manually subtracted the 10px so it would align with the image but I'll investigate more later

#My idea with the displayed annotations is that the visual annotation would line up with the image
    - however, the markup right now makes that very difficult since the image and the visual annotations are not on the same level.
    - they don't share a grid, therefore, they can't occupy the same grid-area
    - I think, I have to change the markup
    - either I create a new configuration for viewing annotations component or I make it so that the visual annotations and image are on the same level
    - that's not even touching on how to implement being able to select which annotation to display 

#{isToggled && <Modal />}
    - I've seen this code before but I haven't really had the occasion to use it myself so the reason why the code should be used didn't really stick to me
    - I was just wondering how I could render modal if isToggled is true
    - my first solution was ternary operator since I had been using it a lot when fetching resources
    - render the component if the resource is there, render loading if it is not there
    - render the component if the condition is true, render loading if the condition is false
    - however, in this case, I didn't really need to render anything if the condition is false
    - this code works
    - if isToggled is true and Modal is true, the whole expression evaluates to true and Modal is rendered?

#I was styling the canvas dynamically by positioning it according to the image's position. However, it wasn't working
    - the error was me not writing the px
    - style={{top: `${imageInfo.y}`, left: `${imageInfo.x}`}}
    - style={{top: `${imageInfo.y}px`, left: `${imageInfo.x}px`}}
    - oh, this didn't work, well this particular thing did but the bigger picture didn't work
    - I set the position to fixed and when it scrolled, it maintained the position. Since the image scrolled and the canvas position was fixed, the canvas and image were no longer aligned.
    - I changed the image size to have a max-height so I don't have to scroll. I also didn't like overly large images.

#I wanted to have uniform sizes for the image thumbnails. However, the images submitted are of variety of sizes. 
    - one solution is to use div and pair it with background property
    - however, I didn't want to use that because div isn't very meaningful
    - if possible, I wanted to stick with the img element because it is an image
    - luckily, there is a style that does what I want, which is object-fit: cover

#I was having trouble styling the pages because they all the share the same grid.
    - if I implement a layout for one page using the main grid, it will apply to all other pages since the other pages are under the main grid as well.
    - I think the solution is to have divs for each page and have the main grid be 100% in width
    - that way, I can divide up the space however I want on the divs and the other pages won't be affected since the main grid is 100% all across the pages.

#I styled the components so that the layouts are centred around the image.
    - I started by using image info and positioning the elements according to the image info
    - however, I was getting weird behaviour and the positioning wasn't consistent especially when the image scrolled
    - I changed the layout by using grids
    - I didn't use grids initially because the images varied in size. I didn't know what measurements to use for the center column.
    - luckily, when I used - grid-template-columns: 1fr auto 1fr - the browser automatically used the image width as the value for auto.
    - instead of dynamically setting positions using imageInfo.left, imageInfo.right, etc, the grid automatically sets the adjacent columns as the image's left and image's right
    - there are no extra spaces
    
#I'm having trouble with the controls. I mean it's there but the way it is being presented feels a little off.
    - the whole app feels like an information website and I want more of an interactive feel
    - with regards to the controls, I don't know what to do with it.
    - it doesn't feel right to put them all together because they are different logically. 
    - one is for navigation, which doesn't make sense much at this stage. I don't really need a landing page if it's just one user. I can just go straight to images. 
    - I think it makes more sense when I have users, in which the landing page becomes where the user logs in.
    - then the user, in the homepage, have a variety of links to explore afterwards
    - right now, it doesn't make much sense
    - I think the only relevant navigation is between images and image page
    - then there is another control, which is the add an image
    - it makes sense to have it every page, which is why I put it in the header
    - however, I don't really know where to place it
    - should I place it in the top right
    - should I have icons?
    - what do I even use for images
    - then there is the state changes for the image page
    - one is viewing image, which displays the image alone
    - one is displaying the annotations, which displays the annotations with the image
    - one is annotate, which lets the user annotate the image
    - all of these, navigation, add image, view image, display annotations, and annotate, are controls
    - however, they are distinct from one another and doesn't really make sense to put them all together except that they are all controls, which seems a bit flimsy as far as common logical grouping goes, so I don't know
    - I think, immediately, I will just do hierarchy styling for now, then I'll revisit this grouping problem

#I was positioning individual elements using position relative, then changing their top position so the elements don't overlap. I don't know why it didn't occur to me earlier to make my life simpler and just use div. They were all assigned to the same grid area anyways.

