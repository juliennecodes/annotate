import { useState } from "react";
import "./NewImageForm.css";

export function NewImageForm({ closeForm, setImages }) {
  const [newImageTitle, setNewImageTitle] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState(null);

  const fetchImages = () => {
    fetch(`/images`)
      .then((res) => res.json())
      .then((serverResponse) => {
        closeForm();
        setImages(serverResponse.images);
      });
  };

  const submitForm = (title, url) => {
    const image = { title: title, url: url };
    fetch("/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    }).then((res) => fetchImages());
  };

  return (
    <div className="add-image-form-div">
      <svg
        className="close-form-button"
        onClick={closeForm}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        fill="hsl(215, 66%, 40%)"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
      </svg>
      <h1 className="add-image-form-heading">Add New Image</h1>
      <form
        className="add-image-form"
        aria-label="add-image-form"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm(newImageTitle, newImageUrl);
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          aria-label="title-input"
          placeholder="Title..."
          onChange={(e) => setNewImageTitle(e.target.value)}
        />

        <label htmlFor="url">Url</label>
        <input
          type="text"
          id="url"
          aria-label="url-input"
          placeholder="Url..."
          onChange={(e) => setNewImageUrl(e.target.value)}
        />

        <button>Submit</button>
      </form>
    </div>
  );
}
