import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";
import "./Images.css";

export function Images() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    fetch("/images")
      .then((res) => res.json())
      .then((serverResponse) => setImages(serverResponse.images));
  }, []);
  
  return images ? (
    <>
      <h1>Images Page</h1>
      <ul className="image-thumbnails">
        {images.map((image, index) => (
          <ImageThumbnail image={image} key={index} />
        ))}
      </ul>
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
