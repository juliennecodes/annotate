import { useState } from "react";
import { Canvas } from "./Canvas";
import "./Annotate.css";

export function NewAnnotationForm({ image }) {
  const [writtenAnnotation, setWrittenAnnotation] = useState(null);
  const [visualAnnotation, setVisualAnnotation] = useState(null);

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

  return (
    <>
      <Canvas/>

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

      <form
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
