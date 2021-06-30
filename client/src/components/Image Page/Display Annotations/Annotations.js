import { useEffect, useState } from "react";
import { CircleIcon } from "../../Icons/CircleIcon";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import "./Annotations.css";

export function Annotations({ annotations, updateAnnotations }) {
  const [currentAnnotation, setCurrentAnnotation] = useState(
    annotations[annotations.length - 1]
  );

  const deleteAnnotation = (annotation) => {
    fetch(`/annotations/${annotation.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => updateAnnotations());
  };

  useEffect(() => {
    setCurrentAnnotation(annotations[annotations.length - 1]);
  }, [annotations]);
  // This makes it so current annotation is updated when a new annotation is made
  // Without it, the current annotation remains the last item of the initial annotations
  // The annotations in the image page gets updated but it seems the current annotations remained
  // This code basically says if annotations changed, change currentAnnotation as well

  const AnnotationsList = () => {
    return (
      <div className="annotations-list-div">
        <h2>Annotations</h2>
        <ul className="annotations-list">
          {annotations.map((annotation, index) => {
            return (
              <AnnotationListItem
                annotation={annotation}
                setCurrentAnnotation={setCurrentAnnotation}
                key={index}
              />
            );
          })}
        </ul>
      </div>
    );
  };

  const AnnotationListItem = ({ annotation }) => {
    return (
      <li
        className="annotation-list-item"
        onClick={() => setCurrentAnnotation(annotation)}
      >
        <CircleIcon />
      </li>
    );
  };

  const VisualAnnotation = () => {
    const imageInfo = document.querySelector(".image").getBoundingClientRect();

    return (
      <img
        style={{
          width: imageInfo.width,
          height: imageInfo.height,
        }}
        className="visual-annotation"
        src={currentAnnotation.visual}
        alt={`visual annotation`}
      ></img>
    );
  };

  const WrittenAnnotation = () => {
    return (
      <div className="written-annotation-div">
        <DeleteIcon
          className="written-annotation-delete-button"
          onClickCallback={() => deleteAnnotation(currentAnnotation)}
          size={16}
        />
        <p className="written-annotation">{currentAnnotation.written}</p>
      </div>
    );
  };

  return (
    <>
      <AnnotationsList />
      {currentAnnotation && (
        <>
          <VisualAnnotation />
          <WrittenAnnotation />
        </>
      )}
    </>
  );
}
