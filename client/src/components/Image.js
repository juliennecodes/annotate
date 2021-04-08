import { useEffect, useState } from "react";
import "./Image.css";
import { useParams, useHistory } from "react-router-dom";
import { Loading } from "./Loading";
import { Annotations } from "./Annotations";
import { NewAnnotationForm } from "./NewAnnotationForm";

export function Image() {
  const [image, setImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/images/${id}`)
      .then((res) => res.json())
      .then((serverResponse) => setImage(serverResponse.image));
  }, [id]);

  return image ? (
    <div>
      <CurrentImage image={image} />
      <Annotations image={image} />
      <NewAnnotationForm image={image} />
      <DeleteButton image={image} />
    </div>
  ) : (
    <Loading />
  );
}

function CurrentImage({ image }) {
  return (
    <div className="image-page">
      <h1>Image Page</h1>
      <img className="image" src={image.url} alt={image.name}></img>
      <p className="image-name">{image.name}</p>
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
    })
      .then((res) => res.json())
      .then((serverResponse) => history.push("/images"));
  };

  return <button onClick={() => deleteImage(image.id)}>Delete Image</button>;
}
