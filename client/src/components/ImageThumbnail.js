import { Link } from "react-router-dom";

export function ImageThumbnail({image}){
    const url= image.url;
    const id = image.id;
    return(
        <li>
            <Link to={`/images/${id}`}>
                <img src={url} alt={image.name}></img>
            </Link>
        </li>
    );
}