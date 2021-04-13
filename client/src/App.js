import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { Homepage } from "./components/Homepage";
import { Images } from "./components/Images";
import { Image } from "./components/Image";
import { NewImageModalWrapper } from "./components/NewImageModal";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="header">
          <Navigation />
          <NewImageModalWrapper />
        </header>
        <main className="main">
          <Switch>
            <Route exact path="/" component={Homepage} />

            <Route exact path="/images" component={Images} />

            <Route exact path="/images/:id" component={Image} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
