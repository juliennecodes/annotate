export function ColourSwatches({ setCurrentColour }) {
  const colourSwatches = [
    "hsl(352, 100%, 65%)",
    "hsl(41, 100%, 65%)",
    "hsl(193, 72%, 63%)",
    "hsl(0, 0%, 100%)",
    "hsl(0, 0%, 50%)",
    "hsl(0, 0%, 0%)",

  ];

  return (
    <ul className="colour-swatches">
      {colourSwatches.map((swatch, index) => {
        return (
          <li 
          className={index === 0 ? "colour-swatch current-swatch" : "colour-swatch"}
          onClick={(e) => {setCurrentColour(swatch); setAsCurrentSwatch(e.target)}}
          key={index}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill={swatch}
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" />
            </svg>
          </li>
        );
      })}
    </ul>
  );
}

function setAsCurrentSwatch(element){
  document.querySelector(".current-swatch").classList.remove("current-swatch");
  element.classList.add("current-swatch");
}