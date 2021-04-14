import { useState } from "react";
import { Canvas } from "./Canvas";
import "./Annotate.css";

export function Annotate({ image }) {
  const [writtenAnnotation, setWrittenAnnotation] = useState(null);
  const [visualAnnotation, setVisualAnnotation] = useState(null);
  const imageInfo = document.querySelector(".image").getBoundingClientRect();

  const submitForm = (visual, written) => {
    const annotation = { visual, written };

    fetch(`/images/${image.id}/annotations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ annotation }),
    }).then((res) => window.location.reload());
  };

  const SetImageAnnotationButton = () => {
    return (
      <button
      style={{position: "absolute", top: imageInfo.top, left: imageInfo.right + 16}}
        className="set-visual-annotation-button"
        onClick={() => {
          const canvas = document.querySelector(".canvas");
          const currentCanvasState = canvas.toDataURL();
          setVisualAnnotation(currentCanvasState);
        }}
      >
        Set Image Annotation
      </button>
    );
  };

  return (
    <>
      <Canvas />
      <SetImageAnnotationButton />
      <form
        style={{position: "absolute", top: imageInfo.top + 36, left: imageInfo.right + 16}}
        className="annotate-form"
        aria-label="annotate-form"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm(visualAnnotation, writtenAnnotation);
        }}
      >
        <label htmlFor="annotation">Write New Annotation</label>

        <textarea
          type="text"
          id="annotation"
          aria-label="annotation-input"
          onChange={(e) => setWrittenAnnotation(e.target.value)}
        />

        <button>Submit</button>
      </form>
    </>
  );
}
