import "./Canvas.css";
import { useState } from "react";

export function Canvas({ setVisualAnnotation }) {
  const [drawMode, setDrawMode] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseUpHandler = () => {
    if (drawMode) setIsMouseDown(false);
  };

  const mouseDownHandler = (e) => {
    if (drawMode) {
      draw(e);
      setIsMouseDown(true);
    }
  };

  const mouseMoveHandler = (e) => {
    // if(drawMode && isMouseDown) draw(e);
    // is this redundant?
    // is there a case where isDrawMode is false but isMouseDown is true
    // but isMouseDown can only be set to true when drawMode is true
    // so it might just be redundant
    if (isMouseDown) draw(e);
  };

  // ok, so the situation is, if I click on the canvas while in draw mode, set isMouseDown to true
  // if isMouseDown is true and I move the mouse, draw on the canvas continuously
  // if I release the mouse button, isMouseDown is set to false, 
  // this means that when I move the mouse, it can no longer draw on the canvas
  // I think I need to add drawing a dot when it is in draw mode and I clicked on the canvas

  // ok, so mouseDown on canvas while in drawMode, draw
  // mouseMove and mouseDown while in drawMode, draw
  // mouseUp on canvas while in draw mode, don't draw

  return (
    <div>
      <h1>Canvas</h1>
      <Brush drawMode={drawMode} setDrawMode={setDrawMode} />
      <canvas
        className="canvas"
        width="300"
        height="300"
        onMouseUp={mouseUpHandler}
        onMouseDown={(e) => mouseDownHandler(e)}
        onMouseMove={(e) => mouseMoveHandler(e)}
      ></canvas>
      <button
        onClick={() => {
          const canvas = document.querySelector(".canvas");
          const currentCanvasState = canvas.toDataURL();
          setVisualAnnotation(currentCanvasState);
        }}
      >
        Set Image Annotation
      </button>
      <p>{`drawMode is ${drawMode}`}</p>
    </div>
  );
}

function Brush({ drawMode, setDrawMode }) {
  return (
    <svg
      onClick={() => setDrawMode(!drawMode)}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z" />
    </svg>
  );
}

function drawDot(x, y) {
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillRect(x, y, 5, 5);
}

// check if drawMode is true, then call drawDot

function getCoordinates(e) {
  const viewportXCoordinate = e.clientX;
  const viewportYCoordinate = e.clientY;

  const canvas = document.querySelector(".canvas");
  const canvasInfo = canvas.getBoundingClientRect();

  const canvasLeft = canvasInfo.x;
  const canvasTop = canvasInfo.y;

  const x = viewportXCoordinate - canvasLeft;
  const y = viewportYCoordinate - canvasTop;

  return { x, y };
}

function draw(e) {
  const { x, y } = getCoordinates(e);
  drawDot(x, y);
}
