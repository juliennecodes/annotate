import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [x, setX] = useState(null);

  useEffect(() => {
    fetch("/x")
      .then((res) => res.json())
      .then((object) => setX(object.x));
  }, []);
  
  return <div className="App">{x ? <p>{x}</p> : <p>Loading</p>}</div>;
}

export default App;
