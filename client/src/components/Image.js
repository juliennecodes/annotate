import { useEffect, useState } from "react";
import { Loading } from "./Loading";

export function Image({ match }) {
  const [image, setImage] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    fetch(`images/${id}`)
      .then((res) => res.json())
      .then((x) => setImage(x.image));
  }, [id]);

  return image ? <CurrentImage image={image} /> : <Loading />;
}

function CurrentImage({ image }) {
  return (
    <div>
      <h1>Image Page</h1>
      <img src={image.url} alt={image.name}></img>
    </div>
  );
}


