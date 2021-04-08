import { useState } from "react";
import { Canvas } from "./Canvas";

export function NewAnnotationForm({ image }) {
  const [writtenAnnotation, setWrittenAnnotation] = useState(null);
  const [visualAnnotation, setVisualAnnotation] = useState(null);

  const submitForm = (visualAnnotation, writtenAnnotation) => {
    console.log(`image annotation is ${visualAnnotation}`);
    console.log(`type of image annotation is ${typeof(visualAnnotation)}`);
    console.log(`text annotation is ${writtenAnnotation}`);
    console.log(`image id is ${image.id}`);
    fetch(`/images/${image.id}/annotations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ visualAnnotation, writtenAnnotation }),
    })
      .then((res) => res.json())
      .then((serverResponse) => window.location.reload());
  };
  return (
    <div>
      <h2>New Annotation Form</h2>
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
      <Canvas visualAnnotation={visualAnnotation} setVisualAnnotation={setVisualAnnotation}/>
    </div>
  );
}
