import { useState } from "react";
import { Canvas } from "./Canvas";

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
      <Canvas
        visualAnnotation={visualAnnotation}
        setVisualAnnotation={setVisualAnnotation}
      />
      <form
        className="form"
        aria-label="add-annotation-form"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm(visualAnnotation, writtenAnnotation);
        }}
      >
        <label htmlFor="annotation">Write New Annotation</label>

        <textarea
          type="text"
          name="annotation"
          aria-label="annotation-input"
          onChange={(e) => setWrittenAnnotation(e.target.value)}
        />

        <button>Submit</button>
      </form>
    </>
  );
}
