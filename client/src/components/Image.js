import { useEffect, useState } from "react";
import "./Image.css";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { Annotations } from "./Annotations";
import { NewAnnotationForm } from "./NewAnnotationForm";
import { DeleteImageButton } from "./DeleteImageButton";

export function Image() {
  const [state, setState] = useState("viewing image");
  const [image, setImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/images/${id}`)
      .then((res) => res.json())
      .then((serverResponse) => setImage(serverResponse.image));
  }, [id]);

  const ViewingImage = () => {
    return (
      <div className="image-page a">
        <h1>{`Image Page - ${image.name}`}</h1>
        <img className="image" src={image.url} alt={image.name}></img>
        <div className="controls">
          <button onClick={() => setState("viewing annotations")}>
            View Annotations
          </button>
          <button onClick={() => setState("annotate mode")}>Annotate</button>
          <DeleteImageButton image={image} />
        </div>
      </div>
    );
  };

  const ViewingAnnotations = () => {
    return (
      <div className="image-page b">
        <h1>{`Image Page - ${image.name}`}</h1>
        <img className="image" src={image.url} alt={image.name}></img>
        <Annotations image={image} />
        <button
          className="close-view-annotations"
          onClick={() => setState("viewing image")}
        >
          Close view annotations
        </button>
      </div>
    );
  };

  const AnnotateMode = () => {
    return (
      <div className="image-page c">
        <h1>{`Image Page - ${image.name}`}</h1>
        <img className="image" src={image.url} alt={image.name}></img>
        <NewAnnotationForm image={image} />
        <button className="close-annotation" onClick={() => setState("viewing image")}>
          Close annotations
        </button>
      </div>
    );
  };
  return image ? (
    <>
      {state === "viewing image" ? (
        <ViewingImage />
      ) : state === "viewing annotations" ? (
        <ViewingAnnotations />
      ) : (
        <AnnotateMode />
      )}
    </>
  ) : (
    <Loading />
  );
}
