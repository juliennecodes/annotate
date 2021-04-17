import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Homepage } from "./components/Homepage";
import { ImagesPage } from "./components/ImagesPage";
import { ImagePage } from "./components/ImagePage";

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />

            <Route exact path="/images" component={ImagesPage} />

            <Route exact path="/images/:id" component={ImagePage} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;

