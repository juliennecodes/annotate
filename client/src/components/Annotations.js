import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import {Annotation} from "./Annotation";

export function Annotations({ image }) {
  const [annotations, setAnnotations] = useState(null);

  useEffect(() => {
    fetch(`/images/${image.id}/annotations`)
      .then((res) => res.json())
      .then((serverResponse) => setAnnotations(serverResponse.annotations));
  }, [image]);

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

