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
    if (isMouseDown) draw(e);
  };

  return (
    <div>
      <h1>Canvas</h1>
      <p>{`drawMode is ${drawMode}`}</p>
      <Brush drawMode={drawMode} setDrawMode={setDrawMode} />
      <ClearCanvasButton />
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

function ClearCanvasButton() {
  return (
    <svg
      onClick={()=> clearCanvas()}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z" />
    </svg>
  );
}

function clearCanvas(){
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");
  const canvasInfo = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, canvasInfo.width, canvasInfo.height);
}

function drawDot(x, y) {
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillRect(x, y, 5, 5);
}

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
