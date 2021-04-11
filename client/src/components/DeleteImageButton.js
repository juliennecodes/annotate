import { useHistory } from "react-router-dom";

export function DeleteImageButton({ image }) {
  let history = useHistory();

  const deleteImage = (id) => {
    fetch(`/images/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => history.push("/images"));
  };

  return <button onClick={() => deleteImage(image.id)}>Delete Image</button>;
}
