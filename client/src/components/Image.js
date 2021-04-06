import { useEffect, useState } from "react";
import "./Image.css";
import { useParams, useHistory } from "react-router-dom";
import { Loading } from "./Loading";
import { Annotations } from "./Annotations";
import { NewAnnotationForm } from "./NewAnnotationForm";

export function Image() {
  const [image, setImage] = useState(null);
  const { id } = useParams();
  // const id = match.params.id;

  useEffect(() => {
    fetch(`/images/${id}`)
      .then((res) => res.json())
      .then((serverResponse) => setImage(serverResponse.image));
  }, [id]);

  return image ? <CurrentImage image={image} /> : <Loading />;
}

function CurrentImage({ image }) {
  return (
    <div className="image-page">
      <h1>Image Page</h1>
      <img className="image" src={image.url} alt={image.name}></img>
      <p className="image-name">{image.name}</p>
      <Annotations image={image} />
      <NewAnnotationForm image={image} />
      <DeleteButton image={image} />
    </div>
  );
}

function DeleteButton({ image }) {
  let history = useHistory();

  const deleteImage = (id) => {
    fetch(`/images/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ x: id }),
      // I don't need the body, I don't think
      // rails can get the image id number through the parameter
      // id gets mapped to the :id parameter
      // rails will use this to find which image to delete
    })
      .then((res) => res.json())
      .then((serverResponse) => history.push("/images"));
  };

  return <button onClick={() => deleteImage(image.id)}>Delete Image</button>;
}
