import "./Canvas.css";
import { useState } from "react";
import { BrushIcon, ClearCanvasIcon } from "./CanvasIcons";

export function Canvas({ setVisualAnnotation }) {
  const [drawMode, setDrawMode] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const imageInfo = document.querySelector(".image").getBoundingClientRect();
  const canvasWidth = imageInfo.width;
  const canvasHeight = imageInfo.height;

  const getCoordinates = (e) => {
    const viewportXCoordinate = e.clientX;
    const viewportYCoordinate = e.clientY;

    const canvas = document.querySelector(".canvas");
    const canvasInfo = canvas.getBoundingClientRect();

    const canvasLeft = canvasInfo.x;
    const canvasTop = canvasInfo.y;

    const x = viewportXCoordinate - canvasLeft;
    const y = viewportYCoordinate - canvasTop;

    return { x, y };
  };

  const draw = (e) => {
    const { x, y } = getCoordinates(e);
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.moveTo(coordinates.x, coordinates.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
  };

  const drawDot = () => {
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillRect(coordinates.x, coordinates.y, 3, 3);
  };

  const mouseUpHandler = () => {
    if (drawMode) setIsMouseDown(false);
  };

  const mouseDownHandler = (e) => {
    if (drawMode) {
      drawDot();
      setIsMouseDown(true);
    }
  };

  const mouseMoveHandler = (e) => {
    if (isMouseDown) draw(e);
    setCoordinates(getCoordinates(e));
  };

  return (
    <>
      <div className="canvas-icons">
        <BrushIcon drawMode={drawMode} setDrawMode={setDrawMode} />
        <ClearCanvasIcon />
      </div>
      <canvas
        className="canvas"
        width={`${canvasWidth}`}
        height={`${canvasHeight}`}
        onMouseUp={mouseUpHandler}
        onMouseDown={(e) => mouseDownHandler(e)}
        onMouseMove={(e) => mouseMoveHandler(e)}
      ></canvas>
      <button
        className="set-visual-annotation"
        onClick={() => {
          const canvas = document.querySelector(".canvas");
          const currentCanvasState = canvas.toDataURL();
          setVisualAnnotation(currentCanvasState);
        }}
      >
        Set Image Annotation
      </button>
    </>
  );
}
