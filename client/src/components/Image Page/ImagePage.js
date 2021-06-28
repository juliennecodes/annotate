import { useEffect, useState } from "react";
import "./ImagePage.css";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading";
import { Annotations } from "./Display Annotations/Annotations";
import { Annotate } from "./Annotate/Annotate";
import { FeatureImage } from "./FeatureImage";
import { ImageDetails } from "./Display Image Info/ImageDetails";

export function ImagePage() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [state, setState] = useState("display image");

  useEffect(() => {
    fetch(`/images/${id}`)
      .then((res) => res.json())
      .then((serverResponse) => setImage(serverResponse.image));
  }, [id]);

  const addIndicatorForCurrentStateSetter = (element) => {
    document
      .querySelector(".active-state-setter")
      .classList.remove("active-state-setter");
    element.classList.add("active-state-setter");
  };

  return (
    <>
      <div className="image-page">
        {image ? (
          <>
            <ul className="state-setters">
              <li
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
                onClick={(e) => {
                  setState("display image details");
                  moveImageToLeft();
                  addIndicatorForCurrentStateSetter(e.target);
                }}
              >
                Display Image Details
              </li>
              <li
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
                onClick={(e) => {
                  setState("annotate");
                  moveImageToLeft();
                  addIndicatorForCurrentStateSetter(e.target);
                }}
              >
                Annotate
              </li>
            </ul>
            {image && <FeatureImage image={image} />}
            {state === "display image details" && (
              <ImageDetails image={image} />
            )}
            {state === "display annotations" && (
              <Annotations image={image} setState={setState} />
            )}
            {state === "annotate" && (
              <Annotate image={image} setState={setState} addIndicatorForCurrentStateSetter={addIndicatorForCurrentStateSetter}/>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
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
