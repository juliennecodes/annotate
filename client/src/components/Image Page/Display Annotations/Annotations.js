import { useEffect, useState } from "react";
import "./Annotations.css";

export function Annotations({ annotations, updateAnnotations }) {
  const [currentAnnotation, setCurrentAnnotation] = useState(annotations[annotations.length - 1]);

  const deleteAnnotation = (annotation) => {
    fetch(`/annotations/${annotation.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => updateAnnotations());
  };

  useEffect(()=> {
    setCurrentAnnotation(annotations[annotations.length - 1])
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="hsl(215, 70%, 91%)"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" />
        </svg>
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
        <p className="written-annotation">{currentAnnotation.written}</p>
        <svg
          className="written-annotation-delete-button"
          onClick={() => deleteAnnotation(currentAnnotation)}
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          viewBox="0 0 24 24"
          width="16"
          fill="hsl(215, 66%, 40%)"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
        </svg>
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
