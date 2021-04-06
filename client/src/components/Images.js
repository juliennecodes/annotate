import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";

export function Images() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    fetch("/images")
      .then((res) => res.json())
      .then((serverResponse) => setImages(serverResponse.images));
  }, []);
  
  return images ? (
    <div>
      <h1>Images Page</h1>
      <ul className="images">
        {images.map((image, index) => (
          <ImageThumbnail image={image} key={index} />
        ))}
      </ul>
    </div>
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
