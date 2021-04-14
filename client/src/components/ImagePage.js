import { useEffect, useState } from "react";
import "./ImagePage.css";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { Annotations } from "./Annotations";
import { Annotate } from "./Annotate";
// import { DeleteImageButton } from "./DeleteImageButton";
import {FeatureImage} from "./FeatureImage";

export function ImagePage() {
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
        <FeatureImage image={image}/>
        <button className="view-annotations-button" onClick={() => setState("viewing annotations")}>View Annotations</button>
        <button className="annotate-button" onClick={() => setState("annotate mode")}>Annotate</button>
      </div>
    );
  };

  const ViewingAnnotations = () => {
    return (
      <div className="image-page b">
        <FeatureImage image={image}/>
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
        <FeatureImage image={image}/>
        <Annotate image={image} />
        <button
          className="close-annotate"
          onClick={() => setState("viewing image")}
        >
          Close annotate
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
