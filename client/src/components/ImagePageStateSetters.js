export function ImagePageStateSetters({ setState }) {
  return (
    <div className="image-page-state-setters-div">
      <ul className="image-page-state-setters">
        <li
          role="button"
          className="view-image-button image-page-state-setter"
          onClick={() => setState("viewing image")}
        >
          View image
        </li>

        <li
          role="button"
          className="view-annotations-button image-page-state-setter"
          onClick={() => setState("viewing annotations")}
        >
          Display annotations
        </li>

        <li
          role="button"
          className="annotate-button image-page-state-setter"
          onClick={() => setState("annotate mode")}
        >
          Annotate
        </li>
      </ul>
    </div>
  );
}
