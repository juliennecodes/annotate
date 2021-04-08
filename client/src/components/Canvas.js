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

function drawColouredSquares() {
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "pink";
  ctx.fillRect(10, 10, 50, 50);
  ctx.fillStyle = "blue";
  ctx.fillRect(10, 70, 50, 50);
}

function drawLines() {
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(10, 150);
  ctx.lineTo(100, 150);
  ctx.moveTo(10, 160);
  ctx.lineTo(100, 160);
  ctx.stroke();
}

function drawSquares(){
  const canvas = document.querySelector(".canvas");
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.fillRect(50, 50, 100, 100);
  ctx.beginPath();
  ctx.fillRect(150, 150, 100, 100);
}