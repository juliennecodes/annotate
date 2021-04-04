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
    <form className="form" aria-label="add-image-form" 
          onSubmit={() => submitForm(newImageName, newImageUrl)}
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
      <button>
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
    .then((x) => console.log(x.message));
}

// function Form() {
//   const [newImageName, setNewImageName] = useState(null);
//   const [newImageUrl, setNewImageUrl] = useState(null);
//   return (
//     <form
//       className="form"
//       aria-label="add-image-form"
//       onSubmit={(e) => submit(e, newImageName, newImageUrl)}
//     >
//       <label htmlFor="name">Name</label>
//       <input
//         type="text"
//         name="name"
//         aria-label="name-input"
//         onChange={(e) => setNewImageName(e.target.value)}
//       />
//       <label htmlFor="url">Url</label>
//       <input
//         type="text"
//         name="url"
//         aria-label="url-input"
//         onChange={(e) => setNewImageUrl(e.target.value)}
//       />
//       <input type="submit" value="Submit" />
//     </form>
//   );
// }

// function submitForm(newImageName, newImageUrl) {
//   fetch("/images", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ newImageName, newImageUrl }),
//   })
//     .then((res) => res.json())
//     .then((x) => console.log(x.message));
// }

// function submit(e, newImageName, newImageUrl) {
//   e.preventDefault();
//   submitForm(newImageName, newImageUrl);
// }

// html form wants to submit on its own
// however, javascript is the one submitting
// so, to prevent html form from submitting, write e.preventDefault();

// define function inside form component so newImageName and newImageUrl are in scope
// there are three arguments to submit
// cut down on the number of arguments
