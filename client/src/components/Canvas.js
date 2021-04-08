import "./Canvas.css";

export function Canvas({setVisualAnnotation}) {
  return (
    <div>
      <h1>Canvas</h1>
      <canvas className="canvas" width="300" height="300"></canvas>
      <button
        onClick={() => {
          const canvas = document.querySelector(".canvas");
          const currentCanvasState = canvas.toDataURL();
          setVisualAnnotation(currentCanvasState);
        }}
      >
        Set Image Annotation
      </button>
    </div>
  );
}
// the canvas element creates a fixed size drawing surface
// the canvas element exposes the canvas api, which can be used to get rendering contexts - i.e 2d, webgl
// rendering contexts are used to create and manipulate the content shown

// canvas is initially blank
// to display something, the script first needs to access the rendering context and draw on it

function drawRectangles() {
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");
  // getContext method
  // used to obtain the rendering context
  // method takes one parameter, the type of context

  ctx.fillStyle = "pink";
  ctx.fillRect(10, 10, 50, 50);
  // x, y, width, height
  // x. y is top left of the rectangle
  // specify width of rectangle
  // specify height of rectangle

  ctx.fillStyle = "blue";
  ctx.fillRect(10, 70, 50, 50);
}
// when you call this function, two rectangles are drawn

function drawTriangle() {
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");

  // to draw a path, you begin path, describe path
  // then you add a stroke to it so the description moves beyond a description to something that can be seen
  // to create a new path, I think you do beginPath again

  // ctx.beginPath();
  // ctx.moveTo(100, 10);
  // ctx.moveTo(150, 30);
  // ctx.moveTo(100, 50);
  // ctx.fill();
  // the methods are called on the context object
  // rendering context makes drawing tools available
  // canvas element makes rendering context available
  // rendering context makes drawing tools available

  // I made a mistake, I was using moveTo for after the first point had been made
  // the right method to use was lineTo
  ctx.beginPath();
  ctx.moveTo(100, 10);
  ctx.lineTo(150, 30);
  ctx.lineTo(100, 50);
  ctx.fill();
  // where did it get colour though?
  // I tried it and it used blue
  // does it use the latest colour

  // I didn't use closePath but apparently, it tries to close the shape by drawing a straight line from
  // the current point to the start
}

function draw() {
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.moveTo(10, 150);
  // move to doesn't actually draw anything
  // however, it is still part of drawing a path
  // it is akin to lifting the pen from one spot on a piece of paper to another spot
  // moveTo moves the pen to the specified x,y coordinates
  // moveTo moves to a new drawing position

  // moveTo can be used to place the starting point of a path
  // moveTo can be used to draw unconnected paths
  ctx.lineTo(100, 150);
  ctx.moveTo(10, 160);
  ctx.lineTo(100, 160);
  ctx.stroke();
  // this is all one path, they are just not connected
  // I think you can also just draw two different paths but you have to do two beginPath

  // lineTo draws a line from the current drawing position to the new position specified by x,y
}

// note on closed paths
// when a path is filled, it is automatically closed
// when a path is stroked, it is not automatically closed
// you have to do closePath() to close the path and make a shape
// you close the path and then you stroke when making a shape

function drawSquare(){
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.fillRect(50, 50, 100, 100);
}