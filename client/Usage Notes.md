#Usage Notes

user opens app ->
user is on homepage
homepage shows annotate
homepage shows get started

user clicks on get started ->
user sees images page

<!-- images = 0 -->
user sees images page ->
page says there are no images, add one?

user clicks add new image ->
form pops up
form field for name is on the page
form field for url is on the page
cancel button is on the page
there is also a x icon that cancels adding a new image
add new image button is on the page

user clicks cancel button ->
form closes

user clicks x ->
form closes

user clicks add new image button after typing in information ->
form submitted
form fields are cleared

<!-- images > 0 -->
user sees images page ->
all images are displayed

            <!-- images state -->
            images = null   - loading
            images = 0      - no images
            images > 0      - images

user clicks on image thumbnail ->
user is on image page
image page shows links to images
image page shows button for adding new image
image page shows image
image page shows image name
image page shows annotate button
image page shows view annotations
image page shows delete image

            <!-- image state -->
            viewing image
            annotate mode
            viewing annotations

<!-- viewing image state-->
user is on image page

user clicks delete image ->
user is on images page
deleted image is not there

user clicks link to images ->
user is on images page

<!-- annotating state -->
user is on image page

user clicks add new annotation ->
canvas with dotted border overlays the image
brush icon is on the page
clear canvas icon is on the page
form for writing annotation pops up
button for annotate is on the page
button for cancelling is on the page

user clicks on brush ->
brush icon is selected
whenever mouse is on the canvas, the cursor is the brush icon

user clicks on the canvas with the brush icon selected ->
marks are made on the canvas

user clicks on the canvas with the brush icon not selected ->
no change on the canvas

user clicks on the clear canvas icon ->
canvas is cleared

user draws on the canvas, types in the textbox, and clicks annotate ->
user is on image page

<!-- viewing annotations state-->
user clicks view annotations ->
user sees a list of annotations

user clicks on an annotation ->
visual annotation overlays the image
written annotation is below the image
other annotations are on the side
annotation selected is bold

            <!-- annotation state -->
            on display
            not on display

user clicks close annotations ->
user is on image page
