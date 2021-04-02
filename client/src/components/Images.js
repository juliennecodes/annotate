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
// I've been deleting images and the changes haven't been reflected in real time
// I had to refresh it to see if an image was deleted
// I think this is because I specified an empty array as the dependency array
// Once it makes the fetch request, it is done
// However, I want react to update the ui if there are any changes

// I actually wrote it but the end result was react making a lot of get requests
// I also realized that the user won't really get to see the updated changes because
// the user isn't deleting the image from the images page
// the user is deleting the image from the image page, therefore,
// the user won't have the need to see the images page update

function ImageThumbnails({ images }) {
  return (
    <div>
      <h1>Images Page</h1>
      <ul className="images">
        {images.map((image, index)=> <ImageThumbnail image={image} key={index}/>)}
      </ul>
    </div>
  );
}
