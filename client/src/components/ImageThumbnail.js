// export function Image({image}){
//     const url= image.url;
//     const id = image.id;
//     return(
//         <li>
//             <a href={`images/${id}`}>
//                 <img src={url} alt={image.name}></img>
//             </a>
//         </li>
//     );
// }
// I'm not sure about this one
// Can I use anchor tags in react
// I was going to use the Link tag from react router dom but that renders text
// I need the image to be a link, which is why I'm using anchor tag and image tag
// I wonder if there is an image link in react router

import { Link } from "react-router-dom";

// Oh, shoot, what does this look like?
// How do I control what images/id looks like
// right now this just creates a link to an image page
// Oh, I need to render a component
// new page needs new component
// I do need to use Link
// or maybe Route? 

// Ok, so I tried it and it looked the same but the console says Waiting for signal from WDS

// Hm, I need to think about this
// What do I want,
// I have a homepage
// I have an images page, which displays the images
// I think I actually need to move this in the image page
// No, I think this is fine
// What I do need to do is hmmm, I need a route
// When the route matches the url in the app, render that component
// yep, I think that is it
// I may need to rename this component
// It's not really the image, it's more the link to the images
// thumbnail?
// thumbnail link?

// export function ImageThumbnail({image}){
//     const url= image.url;
//     const id = image.id;
//     return(
//         <li>
//             <a href={`images/${id}`}>
//                 <img src={url} alt={image.name}></img>
//             </a>
//         </li>
//     );
// }

// I was thinking of where to put the routes that made sense
// My immediate thought was in images because rendering an image concerns images
// However, I thought about it more and this really concerns routes so it makes sense to put the route in app
// I got to this conclusion by thinking about what I want to happen
// I want to render this component when the url is on this page

// actually, let's try link from react router dom and see if that makes a difference

export function ImageThumbnail({image}){
    const url= image.url;
    const id = image.id;
    return(
        <li>
            <Link to={`images/${id}`}>
                <img src={url} alt={image.name}></img>
            </Link>
        </li>
    );
}