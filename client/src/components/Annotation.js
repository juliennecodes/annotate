// export function Annotation({ annotation }) {
//   return annotation ? (
//     <div className="annotation">
//       <VisualAnnotation visualAnnotation={annotation.visual} />
//       <WrittenAnnotation writtenAnnotation={annotation.written} />
//     </div>
//   ) : (
//     <></>
//   );
// }

export function VisualAnnotation({ visualAnnotation }) {
  return (
    <img
      className="visual-annotation"
      src={visualAnnotation}
      alt="visual annotation"
    ></img>
  );
}

export function WrittenAnnotation({ writtenAnnotation }) {
  return <p className="written-annotation">{writtenAnnotation}</p>;
}
