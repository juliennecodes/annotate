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
    // .then(x => alert(`${x.new_image.name} image created`));
    // .then(x => alert("New image created"));
    // hm, there is no alert, does create not send a json response?
    // .then(x => alert(x.message)); //no alert
    // .then(x => console.log(x));
    .then(x => console.log(x.message));


}
// to decide on where to direct your fetch request,
// look at the method of the request,
// use that information and look up what path matches that method in the rails routes
// in this case, POST matches the path of "/images" that will be handled by the images controller with the action create

// export function NewImageForm() {
//   return (
//     <div>
//       <h1>Form For New Image</h1>
//     </div>
//   );
// }
