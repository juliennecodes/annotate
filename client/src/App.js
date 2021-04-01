import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Homepage } from "./components/Homepage";
import { Images } from "./components/Images";
import { Image } from "./components/Image";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          <Route path="/images">
            <Images />
          </Route>

          <Route path="/images/:id" component={Image} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
