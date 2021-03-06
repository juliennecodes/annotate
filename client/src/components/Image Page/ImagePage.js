import { useEffect, useState } from "react";
import "./ImagePage.css";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading";
import { Annotations } from "./Display Annotations/Annotations";
import { Annotate } from "./Annotate/Annotate";
import { ImageDetails } from "./Display Image Info/ImageDetails";

export function ImagePage() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [annotations, setAnnotations] = useState(null);
  const [state, setState] = useState("display image");

  useEffect(() => {
    fetch(`/images/${id}`)
      .then((res) => res.json())
      .then((serverResponse) => {
        setImage(serverResponse.image);
      setAnnotations(serverResponse.annotations)});
  }, [id]);

  const updateAnnotations = () => {
      fetch(`/annotations?imageId=${id}`)
        .then((res) => res.json())
        .then((serverResponse) =>  setAnnotations(serverResponse.annotations));
  }

  return (
    <>
      <div className="image-page">
        <h1 className="page-heading">Image Page</h1>
        {image ? (
          <>
            <StateSetters setState={setState} />
            {image && <FeatureImage image={image} />}
            {state === "display image details" && (
              <ImageDetails image={image} />
            )}
            {state === "display annotations" && (
              <Annotations annotations={annotations} updateAnnotations={updateAnnotations}/>
            )}
            {state === "annotate" && (
              <Annotate
                image={image}
                updateAnnotations={updateAnnotations}
                setState={setState}
                addIndicatorForCurrentStateSetter={
                  addIndicatorForCurrentStateSetter
                }
              />
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

function FeatureImage({ image }) {
  return (
    <>
      <img className="image center" src={image.url} alt={image.name}></img>
    </>
  );
}

function StateSetters({ setState }) {
  return (
    <ul className="state-setters">
      <li
        role="button"
        className="active-state-setter"
        onClick={(e) => {
          setState("display image");
          moveImageToMiddle();
          addIndicatorForCurrentStateSetter(e.target);
        }}
      >
        Display Image
      </li>
      <li
        role="button"
        onClick={(e) => {
          setState("display image details");
          moveImageToLeft();
          addIndicatorForCurrentStateSetter(e.target);
        }}
      >
        Display Image Details
      </li>
      <li
        role="button"
        className="display-annotations-button"
        onClick={(e) => {
          setState("display annotations");
          moveImageToLeft();
          addIndicatorForCurrentStateSetter(e.target);
        }}
      >
        Display Annotations
      </li>
      <li
        role="button"
        onClick={(e) => {
          setState("annotate");
          moveImageToLeft();
          addIndicatorForCurrentStateSetter(e.target);
        }}
      >
        Annotate
      </li>
    </ul>
  );
}

function moveImageToMiddle() {
  const image = document.querySelector(".image");
  image.classList.add("center");
}

function moveImageToLeft() {
  const image = document.querySelector(".image");
  image.classList.remove("center");
}

function addIndicatorForCurrentStateSetter(element) {
  document
    .querySelector(".active-state-setter")
    .classList.remove("active-state-setter");
  element.classList.add("active-state-setter");
}
