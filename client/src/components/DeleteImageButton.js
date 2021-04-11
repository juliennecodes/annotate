import { useHistory } from "react-router-dom";

export function DeleteImageButton({ image }) {
  let history = useHistory();

  const deleteImage = (id) => {
    fetch(`/images/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      // .then((res) => res.json())
      // handles header response - 204
      // res.json() errors out because 204 has no content to unpack
      // therefore, subsequent code doesn't execute
      // page doesn't reload
      // subsequent click of delete button sends delete request, which returns 500 
      // because image is already deleted, therefore, rails can't find it
      // 500 error is sent to client
      // 500 error can be unpacked in res.json()
      // subsequent code executes
      // .then((serverResponse) => history.push("/images"));
      // handles 500 error, then it reloads
      .then((res) => history.push("/images"))
  };

  return <button onClick={() => deleteImage(image.id)}>Delete Image</button>;
}

// export function DeleteImageButton({ image }) {
//   let history = useHistory();

//   const deleteImage = (id) => {
//     fetch(`/images/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((serverResponse) => history.push("/images"));
//   };

//   return (
//     <svg
//       onClick={() => deleteImage(image.id)}
//       xmlns="http://www.w3.org/2000/svg"
//       height="24"
//       viewBox="0 0 24 24"
//       width="24"
//     >
//       <path d="M0 0h24v24H0V0z" fill="none" />
//       <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
//     </svg>
//   );
// }
