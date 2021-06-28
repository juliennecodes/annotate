import { useEffect, useState } from "react";
import "./ImagePage.css";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading";
import { Annotations } from "./Display Annotations/Annotations";
import { Annotate } from "./Annotate/Annotate";
import { FeatureImage } from "./FeatureImage";
import { ImageDetails } from "./Display Image Info/ImageDetails";

export function ImagePage() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [state, setState] = useState("display image");

  useEffect(() => {
    fetch(`/images/${id}`)
      .then((res) => res.json())
      .then((serverResponse) => setImage(serverResponse.image));
  }, [id]);

  return (
    <>
      <div className="image-page">
        {image ? (
          <>
            <ul className="state-setters">
                <li onClick={()=> {setState("display image"); moveImageToMiddle();}}>Display Image</li>
                <li onClick={()=> {setState("display image details"); moveImageToLeft();}}>Display Image Details</li>
                <li onClick={()=> {setState("display annotations"); moveImageToLeft();}}>Display Annotations</li>
                <li onClick={()=> {setState("annotate"); moveImageToLeft();}}>Annotate</li>
            </ul>
            {image && <FeatureImage image={image} />}
            {state === "display image details" && <ImageDetails image={image}/>}
            {state === "display annotations" && <Annotations image={image} setState={setState}/>}
            {state === "annotate" && <Annotate image={image} setState={setState}/>}

            </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}




function moveImageToMiddle(){
  const image = document.querySelector(".image");
  image.classList.add("center");
}

function moveImageToLeft(){
  const image = document.querySelector(".image");
  image.classList.remove("center");
}
