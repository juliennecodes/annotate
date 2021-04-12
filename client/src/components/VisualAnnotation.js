export function VisualAnnotation({ visualAnnotation }) {
  const imageInfo = document.querySelector(".image").getBoundingClientRect();

  return (
    <img
      style={{ width: imageInfo.width, height: imageInfo.height }}
      className="visual-annotation"
      src={visualAnnotation}
      alt="visual annotation"
    ></img>
  );
}
