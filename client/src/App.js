import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Homepage } from "./components/Homepage/Homepage";
import { ImagesPage } from "./components/Images Page/ImagesPage";
import { ImagePage } from "./components/Image Page/ImagePage";

function App() {
  return (
    <main className="App">
      <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />

            <Route exact path="/images" component={ImagesPage} />

            <Route exact path="/images/:id" component={ImagePage} />
          </Switch>
      </Router>
    </main>
  );
}

export default App;

