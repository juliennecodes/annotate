export function FeatureImage({ image }) {
  return (
    <>
      <img className="image center" src={image.url} alt={image.name}></img>
    </>
  );
}
