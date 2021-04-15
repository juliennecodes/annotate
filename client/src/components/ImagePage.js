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

  // const ViewAnnotationsButton = () => {
  //   return (
  //     <button
  //       className="view-annotations-button"
  //       onClick={() => setState("viewing annotations")}
  //     >
  //       View Annotations
  //     </button>
  //   );
  // };

  // const AnnotateButton = () => {
  //   return (
  //     <button
  //       className="annotate-button"
  //       onClick={() => setState("annotate mode")}
  //     >
  //       Annotate
  //     </button>
  //   );
  // };

  const ViewImageButton = () => {
    return (
      <p
        role="button"
        className="view-image-button"
        onClick={() => setState("viewing image")}
      >
        View Image
      </p>
    );
  };

  const ViewAnnotationsButton = () => {
    return (
      <p
        role="button"
        className="view-annotations-button"
        onClick={() => setState("viewing annotations")}
      >
        View Annotations
      </p>
    );
  };

  const AnnotateButton = () => {
    return (
      <p
        role="button"
        className="annotate-button"
        onClick={() => setState("annotate mode")}
      >
        Annotate
      </p>
    );
  };

  const ViewingImage = () => {
    return (
      <>
        <Header />
        <main className="main">
          <div className="image-page image-page-view-image">
            <h1 className="image-page-heading">Viewing Image</h1>
            <FeatureImage image={image} />
            <ViewImageButton />
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
            <h1 className="image-page-heading">Viewing Annotations</h1>
            <FeatureImage image={image} />
            <ViewImageButton />
            <ViewAnnotationsButton />
            <AnnotateButton />
            <Annotations image={image} setState={setState} />
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
            <h1 className="image-page-heading">Annotate Mode</h1>
            <FeatureImage image={image} />
            <ViewImageButton />
            <ViewAnnotationsButton />
            <AnnotateButton />
            <Annotate image={image} setState={setState} />
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
