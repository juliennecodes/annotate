import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { Homepage } from "./components/Homepage";
import { Images } from "./components/Images";
import { Image } from "./components/Image";
import { NewImageForm } from "./components/NewImageForm";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="header">
          <Navigation />
          <Link className="add-image" to="/new-image-form">
            Add new image
          </Link>
        </header>
        <main className="main">
          <Switch>
            <Route exact path="/" component={Homepage} />

            <Route exact path="/images" component={Images} />

            <Route exact path="/images/:id" component={Image} />

            <Route exact path="/new-image-form" component={NewImageForm} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
