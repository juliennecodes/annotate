import { useEffect, useState } from "react";
import { Loading } from "./Loading";

export function Annotations({ image }) {
  const [annotations, setAnnotations] = useState(null);
  const id = image.id;

  useEffect(() => {
    fetch(`/images/${id}/annotations`)
      .then((res) => res.json())
      .then((x) => setAnnotations(x.annotations));
  }, [id]);

  return annotations ? (
    <div>
      <h2>Annotations</h2>
      <ul className="annotations">
        {annotations.map((annotation, index) => (
          <Annotation annotation={annotation} key={index} />
        ))}
      </ul>
    </div>
  ) : (
    <Loading />
  );
}
// so, here, fetch the annotations given an image

function Annotation({ annotation }) {
  return (
    <li className="annotation">
      <p>{annotation.body}</p>
      <button onClick={() => deleteAnnotation(annotation)}>
        Delete Annotation
      </button>
    </li>
  );
}

function deleteAnnotation(annotation) {
  fetch(`/images/${annotation.image_id}/annotations/${annotation.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((x) => console.log(x.message));
}
