import { useState } from "react";
import { Canvas } from "./Canvas";
import "./Annotate.css";

export function Annotate({ image, setState }) {
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
    }).then((res) => setState("display annotations"));
  };

  const SetImageAnnotationButton = () => {
    return (
      <button
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
      <div className="annotate-form-div">
        <h2 className="annotate-form-heading">Annotation Form</h2>
        <SetImageAnnotationButton />
        <form
          className="annotate-form"
          aria-label="annotate-form"
          onSubmit={(e) => {
            e.preventDefault();
            submitForm(visualAnnotation, writtenAnnotation);
          }}
        >
          <label htmlFor="written-annotation-input">Write New Annotation</label>

          <textarea
          className="annotate-form-textarea"
            type="text"
            id="written-annotation-input"
            aria-label="written-annotation-input"
            onChange={(e) => setWrittenAnnotation(e.target.value)}
          />

          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
