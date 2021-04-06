import { useState } from "react";

export function NewAnnotationForm({ image }) {
  const [newAnnotation, setNewAnnotation] = useState(null);

  const submitForm = (newAnnotation) => {
    fetch(`/images/${image.id}/annotations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newAnnotation }),
    })
      .then((res) => res.json())
      .then((x) => window.location.reload());
  };
  return (
    <div>
      <h2>New Annotation Form</h2>
      <form
        className="form"
        aria-label="add-annotation-form"
        onSubmit={() => submitForm(newAnnotation)}
      >
        <label htmlFor="annotation">Write New Annotation</label>

        <input
          type="text"
          name="annotation"
          aria-label="annotation-input"
          onChange={(e) => setNewAnnotation(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
