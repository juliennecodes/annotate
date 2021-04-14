export function FeatureImage({ image }) {
  return (
    <>
      <img className="image" src={image.url} alt={image.name}></img>
    </>
  );
}
