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
    <form className="form">
      <label for="annotation">Write New Annotation</label>

      <input onChange={(e) => setNewAnnotation(e.target.value)} />
      <button onClick={() => submitForm(newAnnotation, imageId)}>Submit</button>
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
