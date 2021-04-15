import { useState } from "react";
import { Canvas } from "./Canvas";
import "./Annotate.css";

export function Annotate({ image, setState }) {
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
        style={{ position: "relative", top: imageInfo.y }}
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

  // const CloseAnnotateButton = () => {
  //   return (
  //     <button
  //       style={{position: "absolute", top: imageInfo.top - 36, left: imageInfo.right + 160}}
  //       className="close-annotate"
  //       onClick={() => setState("viewing image")}
  //     >
  //       Close annotate
  //     </button>
  //   );
  // };

  const CloseAnnotateButton = () => {
    return (
      <svg
        className="close-annotate"
        onClick={() => setState("viewing image")}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
      </svg>
    );
  };

  return (
    <>
      <Canvas />
      <SetImageAnnotationButton />
      <form
        style={{ position: "relative", top: imageInfo.y + 36 }}
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
      <CloseAnnotateButton />
    </>
  );
}
