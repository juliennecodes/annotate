import { useState } from "react";
import "./NewImageForm.css";

export function NewImageForm() {
  return (
    <div>
      <h1>Form For New Image</h1>
      <Form />
    </div>
  );
}

function Form() {
  const [newImageName, setNewImageName] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState(null);
  return (
    <form className="form">
      <label for="name">Name</label>
      <input type="text" onChange={(e) => setNewImageName(e.target.value)} />
      <label for="url">Url</label>
      <input type="text" onChange={(e) => setNewImageUrl(e.target.value)} />
      <button onClick={() => submitForm(newImageName, newImageUrl)}>
        Submit
      </button>
    </form>
  );
}
function submitForm(newImageName, newImageUrl) {
  fetch("/images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newImageName, newImageUrl }),
  })
    .then((res) => res.json())
    .then(x => console.log(x.message));
}
