import React from "react";
import ReactRouter, {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import Nav from "./Nav";
import Home from "./Home";
import Battle from "./Battle";
import Popular from "./Popular";

class App extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <Router>
          <div className="container">
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/battle" component={Battle} />
              <Route path="/popular" component={Popular} />
              <Route render={() => <p>Not Found!</p>} />
            </Switch>
          </div>
        </Router>
      </React.StrictMode>
    );
  }
}

export default App;
