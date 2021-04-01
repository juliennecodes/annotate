#Usage Notes

#Basic working version
#user posts an image
    - user clicks on post image
    - form pops up for posting to server
    - user fills in form - name, url
    - user clicks post
    - post request is made to server
    <!-- server side -->
    - server receives request
    - server uses information posted to create a new record in database
    - server sends back message that image is posted
    <!-- client side -->
    - user sees message posted
    - user sees user's images page

#user is in images page
    - client makes get request to server for images
    - user sees images

#user clicks on image
    - get request to server for image
    <!-- server side -->
    - server receives request
    - server finds requested image
    - server responds with object with image url
    <!-- client side -->
    - client receives server response
    - client uses server response as img src
    - user sees image

#user writes a comment
    - user clicks + button
    - user sees form for adding comment
    - user types comment
    - user submits comment
    - client posts request to server with comment body and image_id
    <!-- server side -->
    - server receives post request
    - server finds the image in the database
    - server creates a new comment image.comments.create(body: new_comment_body)
    - server responds with message that comment is created
    <!-- client side -->
    - user sees comment posted
    - user sees image page

#user toggles annotations
    - user clicks toggle button
    - client makes get request to server, with the data-attribute-information in image
    <!-- server side -->
    - server receives get request to specific image page
    - server finds the comments for that specific image
    - server responds to get request with an object containing the comments
    <!-- client side -->
    - client receives server response
    - client renders the comments
    - user sees the comments in the image page

#Additional Feature - Drawing overlay on image
#user writes an annotation
    - user clicks + button to annotate
    - state is now annotate state
    - there is a canvas element on top of the image 
        - (I guess if more users are incorporated, there will be more than one canvas? I don't really know canvas so I don't know how to retain information about the canvas and put it in an object)
    - user draws on the canvas
    - user fills in the form (or maybe hm, textbox? no that might not work for small images)
    - user clicks submit
    - client posts requests to server. Request has information on image_id, canvas information, commment body
    <!-- server side -->
    - server receives post request
    - server creates a new comment, image.comments.create(body: new_comment_body, canvas_info: canvas_info)
    - server responds with message that comment is created
    <!-- client -->
    - user sees comment posted
    - user sees image page

#user toggles annotations
    - user clicks toggle button
    - client makes get request to server, with the data-attribute-information in image
    <!-- server side -->
    - server receives get request to specific image page
    - server finds the comments for that specific image
    - comment object has a body and canvas info
    - server responds to get request with an object containing the comments
    <!-- client side -->
    - client receives server response
    - client renders the comments
    - user sees commment1, comment2, comment3, which are clickable

#user toggles an annotation
    - user clicks on an annotation
    - selected annotation is displayed
    - comment is displayed
    - canvas drawing overlay is displayed

#Additional Feature - User log in
#user logs in app
    - user opens app
    - user sees login screen
    - user logs in
    - client makes post request to server containing username
    <!-- server side -->
    - server receives post request
    - server sets session current user to user
    - server responds with message logged in
    <!-- client side -->
    - user sees message logged in
    - user logged in
    <!-- aside -->
    - what does the server state look like? 
        <!-- current_state = {
            :users => {
                User.first => {
                    :id         => 1,
                    :name       => "fry"
                    :images     => {
                        Image.first => {
                            :name       => "image of a pizza",
                            :url        => "https://images/pizza.jpeg"
                            :user_id    => 1
                            :comments   => {
                                Comment.first => {
                                    :body => "Panucci's Pizza",
                                    :canvas_info => "x"
                                }
                            }
                        }
                    }
                },
                User.second => {
                    :id         => 2,
                    :name       => "leela"
                    :images     => {
                        Image.second => { :name, :url, :user_id, :comments}
                        Image.third => { :name, :url, :user_id, :comments}
                        }
                    }
                }
            }
        } -->

#user writes a comment
    - user clicks + comment ... sends post request to server
    <!-- server side -->
    - server responds ...
    <!-- client side -->
    - client renders comment rendering the name, information comes from comment
        - do you make a separate request just for that?
        - hmmm, maybe, have a separate entrypoint for comments? have the username formatted there, where author_name is built into the response?

<!-- I think the interactions with the apps remain the same -->
<!-- Oh, maybe I have to introduce colours now that I have many users -->
<!-- Okay, maybe I'll just start with one -->

<!-- Oh, now that there are many users, how does that work? -->
<!-- Is there a common page hub? -->
<!-- All images? -->
<!-- User images -->
<!-- oh I guess they can have their separate entry points -->
<!-- all images will get request the server, the server does Image.all -->
<!-- user images will get request the server, the server will Image.find_by(id: user_id), the get request will be made to x/:id -->
#user clicks on all images page
    - user is on all images page
    - client makes get request to server
    <!-- server side -->
    - server receives get request to entrypoint that sends object with all images
    - server queries the database for Image.all
    - server responds with object with all images
    - actually, image should be processed to their smaller size - i.e 1000px image but 100px size gets sent - image-preview-version
    <!-- client side -->
    - client receives object with all images
    - client renders images
    - user sees all images

#user clicks on user images page
    - user is on user images page
    - client makes a get request to server
    <!-- server side -->
    - server receives get request to entrypoint that looks like this x/:id
    - server queries the database for Image.find_by(user_id: current_user_id)
    - server responds with an object containing the images by the user
    <!-- client side -->
    - client receives object with user images
    - client renders images
    - user sees user images

#Additional Feature - Multicolour
    - users have own colours assigned to them
    - I think this would be good for private group annotations

#Additional Feature - Delete images

#Additional Feature - Add tags to images

#Okay, so basic actions in this app are
    - log in
    - log out
    - post image
    - write annotation
    - view annotations
    - view all images
    - view own images
    - view other users' images

    - delete images
    - delete annotations
    - edit annotations

