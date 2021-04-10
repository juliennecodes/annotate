import { useState } from "react";
import { Canvas } from "./Canvas";

export function NewAnnotationForm({ image }) {
  const [writtenAnnotation, setWrittenAnnotation] = useState(null);
  const [visualAnnotation, setVisualAnnotation] = useState(null);

  const submitForm = (visual, written) => {
    fetch(`/images/${image.id}/annotations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ visual, written }),
    })
      .then((res) => res.json())
      .then((serverResponse) => window.location.reload());
  };
  return (
    <div>
      <h2>New Annotation Form</h2>
      <Canvas
        visualAnnotation={visualAnnotation}
        setVisualAnnotation={setVisualAnnotation}
      />
      <form
        className="form"
        aria-label="add-annotation-form"
        onSubmit={() => submitForm(visualAnnotation, writtenAnnotation)}
      >
        <label htmlFor="annotation">Write New Annotation</label>

        <input
          type="text"
          name="annotation"
          aria-label="annotation-input"
          onChange={(e) => setWrittenAnnotation(e.target.value)}
        />

        <button>Submit</button>
      </form>
      
    </div>
  );
}
