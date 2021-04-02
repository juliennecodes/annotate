import { useEffect, useState } from "react";
import "./Image.css";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";

export function Image({ match, history }) {
  const [image, setImage] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    fetch(`/images/${id}`)
      .then((res) => res.json())
      .then((x) => setImage(x.image));
  }, [id]);

  return image ? <CurrentImage image={image} history={history} /> : <Loading />;
}

function CurrentImage({ image, history }) {
  return (
    <div className="image-page">
      <h1>Image Page</h1>
      <img className="image" src={image.url} alt={image.name}></img>
      <DeleteButton image={image} history={history} />
      <Link to="/images">Back to images</Link>
    </div>
  );
}

function DeleteButton({ image, history }) {
  return (
    <button onClick={() => deleteImage(image.id, history)}>Delete Image</button>
  );
}

function deleteImage(id, history) {
  fetch(`/delete-images`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ x: id }),
  })
    .then((res) => res.json())
    .then((x) => {
      console.log(x.message);
      history.push("/images");
    });
}
