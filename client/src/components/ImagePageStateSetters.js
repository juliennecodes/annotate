// export function ImagePageStateSetters({ setState }) {
//   return (
//     <div className="image-page-state-setters-div">
//       <ul className="image-page-state-setters">
//         <li
//           role="button"
//           className="view-image-button image-page-state-setter"
//           onClick={() => setState("viewing image")}
//         >
//           View image
//         </li>

//         <li
//           role="button"
//           className="view-annotations-button image-page-state-setter"
//           onClick={() => setState("viewing annotations")}
//         >
//           Display annotations
//         </li>

//         <li
//           role="button"
//           className="annotate-button image-page-state-setter"
//           onClick={() => setState("annotate mode")}
//         >
//           Annotate
//         </li>
//       </ul>
//     </div>
//   );
// }

export function ImagePageStateSetters({ state, setState }) {
  const StateSettersWithCurrentViewingImage = () => {
    return (
      <div className="image-page-state-setters-div">
        <ul className="image-page-state-setters">
          <li
            role="button"
            className="view-image-button image-page-state-setter current-state"
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
  };

  const StateSettersWithCurrentViewingAnnotations = () => {
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
            className="view-annotations-button image-page-state-setter current-state"
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
  };

  const StateSettersWithAnnotateMode = () => {
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
            className="annotate-button image-page-state-setter current-state"
            onClick={() => setState("annotate mode")}
          >
            Annotate
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
      {state === "viewing image" && <StateSettersWithCurrentViewingImage />}
      {state === "viewing annotations" && (
        <StateSettersWithCurrentViewingAnnotations />
      )}
      {state === "annotate mode" && <StateSettersWithAnnotateMode />}
    </>
  );
}
