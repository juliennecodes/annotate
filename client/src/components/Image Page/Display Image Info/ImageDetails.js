import "./ImageDetails.css";
import { DeleteImageButton } from "./DeleteImageButton";


export function ImageDetails({ image }) {
  return (
    <>
      <div className="image-details">
        <p className="image-details-title">{image.name}</p>
        <a className="image-details-url" href={image.url}>
          Source Link
        </a>
      </div>

      <DeleteImageButton image={image} />
    </>
  );
}
