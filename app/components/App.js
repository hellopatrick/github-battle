import React from "react";

import Popular from "./Popular";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <React.StrictMode>
          <Popular />
        </React.StrictMode>
      </div>
    );
  }
}

export default App;
