import { useState } from "react";
import "./NewImageForm.css";

export function NewImageForm() {
  const [newImageName, setNewImageName] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState(null);

  // const submitForm = (name, url) => {
  //   fetch("/images", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, url }),
  //   })
  //     .then((res) => res.json())
  //     .then((serverResponse)=> window.location.reload());

  const submitForm = (name, url) => {
    const image = {name: name, url: url}
    // const x = {image: image};
    fetch("/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({image}),
    })
      // .then((res) => res.json())
      // .then((serverResponse)=> window.location.reload());
      .then((res) => window.location.reload());
  };

  return (
    <div>
      <h1>Form For New Image</h1>
      <form
        className="form"
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
          onChange={(e) => setNewImageName(e.target.value)}
        />

        <label htmlFor="url">Url</label>
        <input
          type="text"
          name="url"
          aria-label="url-input"
          onChange={(e) => setNewImageUrl(e.target.value)}
        />

        <button>Submit</button>
      </form>
    </div>
  );
}
