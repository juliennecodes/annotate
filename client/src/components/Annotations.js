import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { VisualAnnotation, WrittenAnnotation } from "./Annotation";
import { AnnotationListItem } from "./AnnotationListItem";

export function Annotations({ image }) {
  const [annotations, setAnnotations] = useState(null);
  const [currentAnnotation, setCurrentAnnotation] = useState(null);

  useEffect(() => {
    fetch(`/images/${image.id}/annotations`)
      .then((res) => res.json())
      .then((serverResponse) => setAnnotations(serverResponse.annotations));
  }, [image]);

  return annotations ? (
    <>
      {currentAnnotation?
      <>
        <VisualAnnotation visualAnnotation={currentAnnotation.visual} />
        <WrittenAnnotation writtenAnnotation={currentAnnotation.written} />
      </>
      :<></>}
      <ul className="annotations-list">
        {annotations.map((annotation, index) => (
          <AnnotationListItem
            annotation={annotation}
            setCurrentAnnotation={setCurrentAnnotation}
            key={index}
          />
        ))}
      </ul>
    </>
  ) : (
    <Loading />
  );
}
