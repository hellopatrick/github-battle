import React from "react";

export default class BattleResults extends React.Component {
  render() {
    const { location, match } = this.props;
    const { params } = match;
    const { one, two } = params;

    console.log(one, two);

    return (
      <div className="battle-container">
        <h1>
          Hello {one} vs {two}.
        </h1>
      </div>
    );
  }
}
