#Possible problems
#how to set up rails backend and react frontend
    - I'm thinking ideally, I can just do npm start on the react app
    - then rails s to start the server
    - however, I don't know how that works though
    - I only want the server side for rails. I just need the routes, database, and controller
    - I was thinking of only using the server to send back objects from the database but rails has its own index.html
    - what port is rails in? 

#how to find out width and height of image so you know which dimensions the canvas will have
    - oh I was thinking I have to figure it out and write the dimensions in the database
    - I suppose I don't for now?
    - I could maybe find out later when the image is rendered and then I can find out the dimensions then
    - I'll use the image dimensions and then use that information to render a canvas?

#how to serve up smaller files for the image previews in the client side. You don't want a bunch of 1000px images populating the image previews.
    - maybe there is a method that takes care of it
    - maybe if a get request is made to a particular entrypoint, the controller will return a smaller version of that image?
    - how does that work? can rails resize images for you?
