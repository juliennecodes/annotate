import { useState } from "react";

export function NewAnnotationForm({image}) {
  return (
    <div>
      <h2>New Annotation Form</h2>
      <Form image={image} />
    </div>
  );
}

function Form({image}) {
  const [newAnnotation, setNewAnnotation] = useState(null);
  const imageId = image.id
  return (
    <form className="form"
      aria-label="add-annotation-form"
      onSubmit={() => submitForm(newAnnotation, imageId)}
    >
      <label htmlFor="annotation">Write New Annotation</label>

      <input aria-label="annotation-input" onChange={(e) => setNewAnnotation(e.target.value)} />
      <button >Submit</button>
    </form>
  );
}

function submitForm(newAnnotation, imageId) {
  fetch(`/images/${imageId}/annotations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newAnnotation }),
  })
    .then((res) => res.json())
    .then((x) => console.log(x.message));
}
