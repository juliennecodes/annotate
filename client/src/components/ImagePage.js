import { useEffect, useState } from "react";
import "./ImagePage.css";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { Annotations } from "./Annotations";
import { Annotate } from "./Annotate";
// import { DeleteImageButton } from "./DeleteImageButton";
import { FeatureImage } from "./FeatureImage";
import { Header } from "./Header";

export function ImagePage() {
  const [state, setState] = useState("viewing image");
  const [image, setImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/images/${id}`)
      .then((res) => res.json())
      .then((serverResponse) => setImage(serverResponse.image));
  }, [id]);

  const ViewAnnotationsButton = () => {
    return (
      <button
        className="view-annotations-button"
        onClick={() => setState("viewing annotations")}
      >
        View Annotations
      </button>
    );
  };

  const CloseViewAnnotationsButton = () => {
    return (
      <button
        className="close-view-annotations"
        onClick={() => setState("viewing image")}
      >
        Close view annotations
      </button>
    );
  };

  const AnnotateButton = () => {
    return (
      <button
        className="annotate-button"
        onClick={() => setState("annotate mode")}
      >
        Annotate
      </button>
    );
  };

  const ViewingImage = () => {
    return (
      <>
        <Header />
        <main className="main">
          <div className="image-page image-page-view-image">
            <FeatureImage image={image} />
            <ViewAnnotationsButton />
            <AnnotateButton />
          </div>
        </main>
      </>
    );
  };

  const ViewingAnnotations = () => {
    return (
      <>
        <Header />
        <main className="main">
          <div className="image-page image-page-view-annotations">
            <FeatureImage image={image} />
            <Annotations image={image} />
            <CloseViewAnnotationsButton />
          </div>
        </main>
      </>
    );
  };

  const AnnotateMode = () => {
    return (
      <>
        <Header />
        <main className="main">
          <div className="image-page image-page-annotate">
            <FeatureImage image={image} />
            <Annotate image={image} setState={setState}/>
          </div>
        </main>
      </>
    );
  };
  return image ? (
    <>
      {state === "viewing image" && <ViewingImage />}
      {state === "viewing annotations" && <ViewingAnnotations />}
      {state === "annotate mode" && <AnnotateMode />}
    </>
  ) : (
    <Loading />
  );
}
