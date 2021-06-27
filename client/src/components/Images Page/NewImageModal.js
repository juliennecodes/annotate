import { useState } from "react";
import "./NewImageModal.css";
import { NewImageForm } from "./NewImageForm";

export function NewImageModal({ closeForm }) {
  return (
    <div className="new-image-modal">
      <div className="new-image-modal-card">
        <NewImageForm closeForm={closeForm} />
      </div>
    </div>
  );
}

export function NewImageModalWrapper() {
  const [isToggled, setToggled] = useState(false);
  return (
    <div className="add-image-div">
      {isToggled && <NewImageModal closeForm={() => setToggled(false)} />}
      <button className="add-image-button" onClick={() => setToggled(!isToggled)}>Add New Image </button>
    </div>
  );
}
