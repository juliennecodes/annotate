import { useEffect, useState } from "react";
import { Loading } from "./Loading";

export function Image({ match }) {
  const [image, setImage] = useState(null);
  const id = match.params.id;
  // const id = Number(    match.params.id);

  useEffect(() => {
    fetch(`/images/${id}`)
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

// hardcoding values to see if image component is getting rendered
// export function Image({ match }) {
//   return (
//     <div>
//       <h1>Image page</h1>
//       <p>:)</p>
//     </div>
//   );
// }

// testing url parameter
// export function Image({ match }) {
//   const x = match.params.x;
//   console.log(`x is ${x} and type of x is ${typeof(x)}`);

//   return (
//     <div>
//       <h1>Image page</h1>
//       <p>{x + 100}</p>
//     </div>
//   );
// }

// export function Image({ match }) {
//   const [image, setImage] = useState(null);
//   const id = match.params.id;
//   // const id = Number(    match.params.id);

//   useEffect(() => {
//     fetch(`/images/1`)
//       .then((res) => res.json())
//       .then((x) => setImage(x.image));
//   }, [id]);

//   return image ? <CurrentImage image={image} /> : <Loading />;
// }

// function CurrentImage({ image }) {
//   return (
//     <div>
//       <h1>Image Page</h1>
//       <img src={image.url} alt={image.name}></img>
//     </div>
//   );
// }
// this works