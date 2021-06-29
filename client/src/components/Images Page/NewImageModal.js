import { useState } from "react";
import "./NewImageModal.css";
import { NewImageForm } from "./NewImageForm";

export function NewImageModal({ closeForm, setImages }) {
  return (
    <div className="new-image-modal">
      <div className="new-image-modal-card">
        <NewImageForm closeForm={closeForm} setImages={setImages} />
      </div>
    </div>
  );
}

export function NewImageModalWrapper({setImages}) {
  const [isToggled, setToggled] = useState(false);
  return (
    <div className="add-image-div">
      {isToggled && <NewImageModal closeForm={() => setToggled(false)} setImages={setImages}/>}
      <button className="add-image-button" onClick={() => setToggled(!isToggled)}>Add New Image </button>
    </div>
  );
}
