export function ColourChoices({ setCurrentColour }) {
  return (
    <div className="colour-choices">
      <svg
        onClick={() => setCurrentColour("hsl(0, 0%, 100%)")}
        className="colour-choice"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        fill="hsl(0, 0%, 100%)"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" />
      </svg>

      <svg
        onClick={() => setCurrentColour("hsl(0, 0%, 50%)")}
        className="colour-choice"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        fill="hsl(0, 0%, 50%)"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" />
      </svg>

      <svg
        onClick={() => setCurrentColour("hsl(0, 0%, 0%)")}
        className="colour-choice"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        fill="hsl(0, 0%, 0%)"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" />
      </svg>
    </div>
  );
}
