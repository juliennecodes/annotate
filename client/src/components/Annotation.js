export function Annotation({ annotation }) {
  const deleteAnnotation = (annotation) => {
    fetch(`/images/${annotation.image_id}/annotations/${annotation.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((serverResponse) => window.location.reload());
  };

  return (
    <li className="annotation">
      <div>
        <VisualAnnotation visualAnnotation={annotation.visual} />
        <WrittenAnnotation writtenAnnotation={annotation.written} />
        <button onClick={() => deleteAnnotation(annotation)}>
          Delete Annotation
        </button>
      </div>
    </li>
  );
}

function VisualAnnotation({ visualAnnotation }) {
  return (
    <div>
      <img src={visualAnnotation} alt="visual annotation"></img>
    </div>
  );
}

function WrittenAnnotation({ writtenAnnotation }) {
  return <p>{writtenAnnotation}</p>;
}