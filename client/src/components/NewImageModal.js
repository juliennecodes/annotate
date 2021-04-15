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

// export function NewImageModalWrapper() {
//   const [isToggled, setToggled] = useState(false);
//   return (
//     <div>
//       {isToggled && <NewImageModal closeModal={() => setToggled(false)} />}
//       <button onClick={() => setToggled(!isToggled)}>Add new image</button>
//     </div>
//   );
// }

// export function NewImageModalWrapper() {
//   const [isToggled, setToggled] = useState(false);
//   return (
//     <div className="add-image-div">
//       {isToggled && <NewImageModal closeForm={() => setToggled(false)} />}
//       <button onClick={() => setToggled(!isToggled)}>Add new image</button>
//     </div>
//   );
// }

export function NewImageModalWrapper() {
  const [isToggled, setToggled] = useState(false);
  return (
    <div className="add-image-div">
      {isToggled && <NewImageModal closeForm={() => setToggled(false)} />}
      <p role="button" onClick={() => setToggled(!isToggled)}>Add new image</p>
    </div>
  );
}

// export function NewImageModalWrapper() {
//   const [isToggled, setToggled] = useState(false);
//   return (
//     <div className="add-image-div">
//       {isToggled && <NewImageModal closeForm={() => setToggled(false)} />}
//       <svg
//         className="add-image-button"
//         onClick={() => setToggled(!isToggled)}
//         xmlns="http://www.w3.org/2000/svg"
//         height="24"
//         viewBox="0 0 24 24"
//         width="24"
//       >
//         <path d="M0 0h24v24H0V0z" fill="none" />
//         <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
//       </svg>{" "}
//     </div>
//   );
// }
