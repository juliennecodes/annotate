// export function Image(){
//     return(
//         <p>:)</p>
//     );
// }

import { useEffect, useState } from "react";
import { Loading } from "./Loading";

// hm, this should work but it isn't
// I was hoping it would just work but maybe react router expects certain configurations since this component
// is working hand in hand with the routes param?
// I was hoping it would work before delving into more complicated code but oh well
// lets try the complicated code then

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
// what is match
// I need to read up on routes

function CurrentImage({ image }) {
  return (
    <div>
      <h1>Image Page</h1>
      <img src={image.url} alt={image.name}></img>
    </div>
  );
}


