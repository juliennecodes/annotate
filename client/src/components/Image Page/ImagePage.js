import { useEffect, useState } from "react";
import "./ImagePage.css";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading";
import { Annotations } from "./Display Annotations/Annotations";
import { Annotate } from "./Annotate/Annotate";
import { FeatureImage } from "./FeatureImage";

export function ImagePage() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [state, setState] = useState("display image");
  const imageDetails = {title: "Fry"}

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
            {state === "display image details" && <ImageDetails imageDetails={imageDetails}/>}
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


function ImageDetails({imageDetails}){
    // maybe go through the whole object
    // maybe map if I end up sending the data to the client as an array 
    return (
        <div className="image-details">
            <p>{imageDetails.title}</p>
        </div>
    )
}

function moveImageToMiddle(){
  const image = document.querySelector(".image");
  image.classList.add("center");
}

function moveImageToLeft(){
  const image = document.querySelector(".image");
  image.classList.remove("center");
}
