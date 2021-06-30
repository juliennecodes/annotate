import { useState } from "react";
import { CloseIcon } from "../Icons/CloseIcon";
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
      <CloseIcon className={"close-form-button"} onClickCallback={closeForm} size={24}/>
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
