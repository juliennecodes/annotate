import { useState } from "react";
import "./NewImageForm.css";

export function NewImageForm() {
  const [newImageName, setNewImageName] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState(null);

  const submitForm = (name, url) => {
    const image = { name: name, url: url };
    fetch("/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    }).then((res) => window.location.reload());
  };

  return (
    <div className="new-image-form">
      <h1>Add New Image</h1>
      <form
        className="add-image-form"
        aria-label="add-image-form"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm(newImageName, newImageUrl);
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          aria-label="name-input"
          placeholder="Name..."
          onChange={(e) => setNewImageName(e.target.value)}
        />

        <label htmlFor="url">Url</label>
        <input
          type="text"
          name="url"
          aria-label="url-input"
          placeholder="Url..."
          onChange={(e) => setNewImageUrl(e.target.value)}
        />

        <button>Submit</button>
      </form>
    </div>
  );
}
