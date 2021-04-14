import { useState } from "react";
import "./NewImageModal.css";
import { NewImageForm } from "./NewImageForm";

export function NewImageModal({ closeModal }) {
  return (
    <div className="new-image-modal">
      <div className="new-image-modal-card">
        <svg
          className="close-new-image-modal-button"
          onClick={closeModal}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
        </svg>
        <NewImageForm />
      </div>
    </div>
  );
}

// export function NewImageModalWrapper() {
//   const [isToggled, setToggled] = useState(false);
//   return (
//     <div>
//       {isToggled && <NewImageModal closeModal={() => setToggled(false)} />}
//       <button onClick={() => setToggled(!isToggled)}>Add new image</button>
//     </div>
//   );
// }

export function NewImageModalWrapper() {
  const [isToggled, setToggled] = useState(false);
  return (
    <div>
      {isToggled && <NewImageModal closeModal={() => setToggled(false)} />}
      <svg
        className="add-image-button"
        onClick={() => setToggled(!isToggled)}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
      </svg>{" "}
    </div>
  );
}
