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
    </li>
  );
}
