So I think, hmm, so I'm having trouble doing the layout for the image page. Specifically with display annotations. It feels really imbalanced to have the annotation circles to the left and having the written annotations to the right.

My idea was maybe move the image when the state is display annotations. I like the image being consistently in the center and the information around it changing as the state changes. However, it really looks imbalanced and I might have to sacrifice the consistency of having a center image just for a more balanced view annotations.

So I think I will be doing this with react spring. So when the state changes to display annotations, I will be moving the position left of the image and shifting it to the left.

Oh right, I'm shifting the app to desktop only use. I think this is fine for now. Plenty of apps are only pleasant to use on desktop screens. I'll get this working first and maybe add mobile later.

So yeah, when the state changes, add or remove classNames to image. The className will be the left position of the image. It will be toggled between 0 and x width.

# Image Details
Image details can be optional since some information may be unavailable so check if the properties exist. If so, render data in UI. If not, don't render anything. In any case, I haven't supported it in the backend, oh actually, I can do it by hardcoding a json response to a route. Mmm, I'll do it later. I'll do the react part first.

# Set up a default annotation so the layout is easier to predict

# When you finish annotating, instead of setting the state to display image, set the state to display annotations. Also, setCurrentAnnotation to the new annotation just made. Maybe have a custom route that responds with the latest annotation of a particular image.

# For colour choices, have an array of colour. Map through that colour array and render the swatches. Also include currently selected colour.

# Layout
Okay, so maybe I change the grid area for display image and display image details. For those states, the styling will be grid-columns: 1/3 and for display annotations and annotate, it will be grid-column: 1/2, which is a named area.

So I guess I will do that with toggling class name and that class name will come later so it overrides the default styling. Okay. I can do that.

So when you click on display annotations and annotate, you remove that class.

When you click on display image, it adds the class.

# To do
- use react spring for animating changing position of image
- add current state indicator
- add more variety to colour
- do display image details
- modify loading component
- use an array for colour swatches
- separate canvas tools with colour swatches, or maybe, have current swatch in canvas tools?
- add next and previous link to images
- change column name in images table from name to title
- add more fields to form, some mandatory, some not, and render data in UI
- change where the requests are being directed
    - annotate, direct the request to annotation controller instead of going through image
    - use useParams to get image id
    - hmm have to reorganize a lot
    - write tests first
