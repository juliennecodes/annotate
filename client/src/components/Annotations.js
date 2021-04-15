import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import "./Annotations.css";

export function Annotations({ image, setState }) {
  const [annotations, setAnnotations] = useState(null);
  const [currentAnnotation, setCurrentAnnotation] = useState(null);
  const imageInfo = document.querySelector(".image").getBoundingClientRect();

  useEffect(() => {
    fetch(`/images/${image.id}/annotations`)
      .then((res) => res.json())
      .then((serverResponse) => setAnnotations(serverResponse.annotations));
  }, [image]);

  const AnnotationsList = () => {
    return (
      <div
        className="annotations-list-div"
        style={{
          position: "relative",
          top: imageInfo.top,
        }}
      >
        <h2>Annotations list</h2>
        <ul className="annotations-list">
          {annotations.map((annotation, index) => (
            <AnnotationListItem
              annotation={annotation}
              setCurrentAnnotation={setCurrentAnnotation}
              key={index}
            />
          ))}
        </ul>
      </div>
    );
  };
  // const CloseViewAnnotationsButton = () => {
  //   return (
  //     <button
  // style={{
  //   position: "absolute",
  //   top: imageInfo.top,
  //   left: imageInfo.right + 100,
  // }}
  // className="close-view-annotations"
  // onClick={() => setState("viewing image")}
  //     >
  //       Close view annotations
  //     </button>
  //   );
  // };

  const CloseViewAnnotationsButton = () => {
    return (
      <svg
        className="close-view-annotations"
        onClick={() => setState("viewing image")}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
      </svg>
    );
  };

  return annotations ? (
    <>
      {currentAnnotation ? (
        <>
          <VisualAnnotation visualAnnotation={currentAnnotation.visual} />
          <WrittenAnnotation annotation={currentAnnotation} />
        </>
      ) : (
        <></>
      )}
      <AnnotationsList />
      <CloseViewAnnotationsButton />
    </>
  ) : (
    <Loading />
  );
}

function VisualAnnotation({ visualAnnotation }) {
  const imageInfo = document.querySelector(".image").getBoundingClientRect();

  return (
    <img
      style={{
        width: imageInfo.width,
        height: imageInfo.height,
      }}
      className="visual-annotation"
      src={visualAnnotation}
      alt="visual annotation"
    ></img>
  );
}

function WrittenAnnotation({ annotation }) {
  const deleteAnnotation = (annotation) => {
    fetch(`/images/${annotation.image_id}/annotations/${annotation.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => window.location.reload());
  };
  return (
    <div className="written-annotation-div">
      <p className="written-annotation">{annotation.written}</p>
      <svg
        className="written-annotation-delete-button"
        onClick={() => deleteAnnotation(annotation)}
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        viewBox="0 0 24 24"
        width="16"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
      </svg>
    </div>
  );
}

// function AnnotationListItem({ annotation, setCurrentAnnotation }) {
//   return (
//     <li onClick={() => setCurrentAnnotation(annotation)}>
//       <div className="annotation-list-item">
//         <p>{`${annotation.written.substring(0, 10)}...`}</p>
//       </div>
//     </li>
//   );
// }

function AnnotationListItem({ annotation, setCurrentAnnotation }) {
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
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" />
      </svg>
    </li>
  );
}
