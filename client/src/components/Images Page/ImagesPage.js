import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../Loading";
import "./ImagesPage.css";
import { NewImageModalWrapper } from "./NewImageModal";

export function ImagesPage() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    fetch("/images")
      .then((res) => res.json())
      .then((serverResponse) => setImages(serverResponse.images));
  }, []);

  return images ? (
    <>
        <div className="images-page">
          <ul className="image-thumbnails">
            {images.map((image, index) => (
              <ImageThumbnail image={image} key={index} />
            ))}
          </ul>
          <NewImageModalWrapper/>
        </div>
    </>
  ) : (
    <Loading />
  );
}

function ImageThumbnail({ image }) {
  return (
    <li>
      <Link to={`/images/${image.id}`}>
        <img className="image-thumbnail" src={image.url} alt={image.name}></img>
      </Link>
    </li>
  );
}
