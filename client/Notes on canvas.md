Ok, so where do I start with canvas?
- render canvas on the page
- make it so that the user can draw on the page
- capture that drawing in a state
- send that state as a json object over to the server
- server records that state
- query the server for that canvas state
- display the canvas state from the database

----------------------------------------------------------------------------------------------------
Ok, so what do I want to do
- I want it so when the user clicks the brush icon, they are activating draw mode
- when in draw mode, a user can click down on the page and mark it

Ok, so user clicks on brush icon, draw mode activated
- when draw mode is activated, canvas can be drawn on

User clicks on a place in the canvas ->
a dot appears where the user clicked

User clicks, holds down button, and moves mouse ->
wherever the mouse moved, a dot appears

user mouse up ->
no dot is created

----------------------------------------------------------------------------------------------------
Okay, so draw mode. When draw mode is activated
- mouse turns to paintbrush when in the canvas area
- brush icon is visibly selected
- user can make marks on the canvas


Okay, so I wrote a function called drawDot
- the function drew a square on the screen
- the x, y position is dependent on the canvas
- for example, drawDot(10, 10) draws a dot 10px to the right and 10px to the bottom of the top left of the canvas
- so 10, 10 coordinates is positioned to the canvas' top left corner
- the problem is, I can get the viewport coordinates of the mouse but it doesn't really line up to the canvas' position
- position 10, 10 on a canvas can be position 110, 60 on the viewport
- that means that top left corner of the canvas is 100, 50
- canx = vpx - canvasLeft
- cany = vpy - canvasTop

Okay, so I was able to draw dot. Next step is drawing dot continuously.
- onmousemove?

----------------------------------------------------------------------------------------------------
ok, to dos after implementing draw on canvas
- add erase feature
- add clear canvas feature
- change cursor to paintbrush when on canvas

----------------------------------------------------------------------------------------------------
