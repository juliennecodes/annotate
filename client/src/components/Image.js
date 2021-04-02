import { useEffect, useState } from "react";
import "./Image.css";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";

export function Image({ match }) {
  const [image, setImage] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    fetch(`/images/${id}`)
      .then((res) => res.json())
      .then((x) => setImage(x.image));
  }, [id, image]);
  // I added image in the dependency array so the ui will be updated when the image is deleted
  // however, I'm not sure
  // is it fine because there are a lot of calls made to the server to get the image

  return image ? <CurrentImage image={image} /> : <Loading />;
}

function CurrentImage({ image }) {
  return (
    <div className="image-page">
      <h1>Image Page</h1>
      <img className="image" src={image.url} alt={image.name}></img>
      <DeleteButton image={image} />
      <Link to="/images">Back to images</Link>
    </div>
  );
}

function DeleteButton({ image }) {
  return <button onClick={() => deleteImage(image.id)}>Delete Image</button>;
}

// function deleteImage(id) {
//   fetch(`images/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({x: id}),
//   })
//     .then((res) => res.json())
//     .then((x) => console.log(x));
// }

// function deleteImage(id) {
//   fetch(`images/8`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({x: 8}),
//   })
//     .then((res) => res.json())
//     .then((x) => console.log(x));
// }

function deleteImage(id) {
  fetch(`/delete-images`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({x: id}),
  })
    .then((res) => res.json())
    .then((x) => console.log(x.message));
}