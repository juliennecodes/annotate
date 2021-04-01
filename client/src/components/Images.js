import { useEffect, useState } from "react";
import { ImageThumbnail } from "./ImageThumbnail";
import { Loading } from "./Loading";

export function Images() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    fetch("/images")
      .then((res) => res.json())
      .then((x) => setImages(x.images));
  }, []);
  return images ? <ImageThumbnails images={images} /> : <Loading />;
}

function ImageThumbnails({ images }) {
  return (
    <div>
      <ul className="images">
        {images.map((image, index)=> <ImageThumbnail image={image} key={index}/>)}
      </ul>
    </div>
  );
}
