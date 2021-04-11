import "./AnnotationListItem.css";

export function AnnotationListItem({ annotation, setCurrentAnnotation }) {
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
    <li onClick={() => setCurrentAnnotation(annotation)}>
      <div className="annotation-list-item">
        <p>{`${annotation.written.substring(0, 5)}...`}</p>

        <svg
          onClick={() => deleteAnnotation(annotation)}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
        </svg>
      </div>
    </li>
  );
}
