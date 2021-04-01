import { useEffect, useState } from "react";
import { ImageThumbnail } from "./ImageThumbnail";
import { Loading } from "./Loading";

export function Images() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    fetch("/images")
    // oh I see, this is why there are api/v1 stuff?
    // it might get confusing because I'm fetching in images in the backend but the webapp's url is /images
      .then((res) => res.json())
      .then((x) => setImages(x.images));
    // are there alternatives to naming the object, that you receive from the server, data
    // data sounds too formal and too scientific
    // object sounds too vague but it is closer to what I'm sending from the server
    // I'm literally just putting the objects I want to send across in an object
    // like, here are the objects you want in a little package
    // I was going to use data in the previous sentence, here are the data you want in a little package
    // this is the information you'll need in a little package
    // I'm not really thinking of the objects inside the package as objects, more as information
    // I renamed it x
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
