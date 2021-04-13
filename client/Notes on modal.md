So modals are those pop ups that appear when you click a button

From the video, it appears that it takes up the entirety of the screen.
- that seems to be why you can't click anything under it
- it only appears that it takes up a portion of the screen while everything is greyed out because there is a modal card
- the modal card, which becomes the focus of the page when the modal is activated, takes up a portion of the screen
- there is usually box shadow to simulate that it is above all the other elements in the page
- so there is the modal, which takes up all of the screen
- then there is the modal card, which takes up a portion of the screen
- the contents go inside the modal card

So structure is
- modal
    - modal card
        - content

Structure with style is
- modal - entire screen
    - modal card - portion of the screen
        - content - portion of the modal card

The modal keeps track of its own state
- the modal component knows when it is supposed to be display
- the modal component knows when it is not supposed to be on the screen

Actually, the structure is
- modal wrapper - which gets included in the app component
    - modal
        - modal card
            - content

It is the modal wrapper that keeps track of its own state
- the modal component just gets rendered

----------------------------------------------------------------------------------------------------
So new modal implementation
- if the user clicks on annotate button
- modal for annotate appears
- what that looks like is, umm, so you have a modal that takes up the entire space
- a canvas that somehow lines up with the image
- because a modal is on an independent grid
- hmm, not sure that would work
- unless the modal grid shares the same styles as the image page grid
- even then, I'm not sure it would work since the browser calculates its own dimensions when I give fr values
- if I don't then, maybe
- since the canvas shares the same width and height as the image since I queried for it in javascript, will the browser distribute the space the same way
- or maybe, don't use grid at all?
- can I query the image position and just position the elements based on that?
- canvas tools will be on 36px to the left of image
- canvas will be position fixed to image's position
- form will be 36px to the image's right


