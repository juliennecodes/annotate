#make passing down history object neater
    - also maybe give a little indication that image is deleted somehow?
    - for now, console log is fine

#customize your loading component
    - for loading images, just do loading in images, not the headers
    - for the annotations, maybe do, loading or no annotations yet

#organize components
    - make it tidy

#fix css

#fix markup

#change add new image link to a button

#I need to set the canvas size according to image size

----------------------------------------------------------------------------------------------------
#Okay, so next steps. What are my next steps
- make it so the user can draw on the canvas
    - right now, I'm drawing in the canvas through functions
    - I wrote functions that create shapes on the canvas
    - afterwards, I click a button to convert the canvas information into data
    - what I want to implement is the user, through mouse movements, drawing on the canvas
    - so user input replaces my drawing function
    - everything else should remain the same
    - canvas information turns into data
    - data posted to server and becomes part of annotation as annotation.visual
    - data can be queried as part of the annotation record

- right now, the page looks really crowded, every annotation is displayed
    - what I want to do is create a button that says display annotations
    - when clicked annotations are displayed
    - when clicked, the button label becomes hide annotation
    - so I'm toggling between annotation being displayed and annotation being hidden

- an upgrade to display annotations
    - only show a circle
    - when that circle is clicked, annotation is displayed
    - the visual annotation will be overlaid on the image
    - the written annotation will be at the bottom of the image
    - the list of circles will be on the right side of the image

- delete annotation should x svg icon and be on the right side of the written annotation

- add new image should be + svg icon

- write new annotation should be a state
    - maybe have annotate mode be true or false
    - if true, button text will be cancel annotate, the form will appear, a canvas over the image will appear
    - if false, button will be annotate, the form will be hidden, the canvas over the image will be hidden
    - a button that says annotate should toggle between annotate mode true or false
----------------------------------------------------------------------------------------------------

