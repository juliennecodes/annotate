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
        <p>{annotation.body}</p>
        <button onClick={() => deleteAnnotation(annotation)}>
          Delete Annotation
        </button>
      </li>
    );
  }