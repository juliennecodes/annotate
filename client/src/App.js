import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { Homepage } from "./components/Homepage";
import { ImagesPage } from "./components/ImagesPage";
import { ImagePage } from "./components/ImagePage";
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

            <Route exact path="/images" component={ImagesPage} />

            <Route exact path="/images/:id" component={ImagePage} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
