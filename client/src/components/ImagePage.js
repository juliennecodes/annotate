import { useEffect, useState } from "react";
import "./ImagePage.css";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { Annotations } from "./Annotations";
import { Annotate } from "./Annotate";
// import { DeleteImageButton } from "./DeleteImageButton";
import { FeatureImage } from "./FeatureImage";
import { Header } from "./Header";
import { ImagePageStateSetters } from "./ImagePageStateSetters";

export function ImagePage() {
  const [state, setState] = useState("viewing image");
  const [image, setImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/images/${id}`)
      .then((res) => res.json())
      .then((serverResponse) => setImage(serverResponse.image));
  }, [id]);

  const ViewingImage = () => {
    return (
      <>
        <Header />
        <main className="main">
          <div className="image-page image-page-view-image">
            <ImagePageStateSetters state={state} setState={setState} />
            <div className="image-page-content">
              <FeatureImage image={image} />
            </div>
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
            <ImagePageStateSetters state={state} setState={setState} />
            <div className="image-page-content">
              <FeatureImage image={image} />
              <Annotations image={image} setState={setState} />
            </div>
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
            <ImagePageStateSetters state={state} setState={setState} />
            <div className="image-page-content">
              <FeatureImage image={image} />
              <Annotate image={image} setState={setState} />
            </div>
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
