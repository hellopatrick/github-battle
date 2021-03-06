import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import PlayerPreview from "./PlayerPreview";

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const username = e.target.value;

    this.setState({
      username,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  }

  render() {
    return (
      <form className="column" onSubmit={this.onSubmit}>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input
          id="username"
          placehoder="Username"
          type="text"
          autoComplete="off"
          value={this.state.username}
          onChange={this.onChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}
        >
          Add to Battle!
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: { name: null, image: null },
      playerTwo: { name: null, image: null },
    };

    this.onPlayerSubmit = this.onPlayerSubmit.bind(this);
    this.onPlayerReset = this.onPlayerReset.bind(this);
  }

  onPlayerSubmit(id, name) {
    const newState = {};

    const image = `https://github.com/${name}.png`;

    newState[id] = {
      name,
      image,
    };

    this.setState(newState);
  }

  onPlayerReset(id) {
    const newState = {};

    newState[id] = {
      name: null,
      image: null,
    };

    this.setState(newState);
  }

  render() {
    const match = this.props.match;

    const playerOneName = this.state.playerOne.name;
    const playerTwoName = this.state.playerTwo.name;

    return (
      <div className="battle-container">
        <div className="row">
          {playerOneName ? (
            <PlayerPreview
              id="playerOne"
              username={this.state.playerOne.name}
              avatar={this.state.playerOne.image}
            >
              <a
                className="reset"
                onClick={this.onPlayerReset.bind(null, "playerOne")}
              >
                Reset
              </a>
            </PlayerPreview>
          ) : (
            <PlayerInput
              onSubmit={this.onPlayerSubmit}
              id="playerOne"
              label="Githubber One"
            />
          )}
          {playerTwoName ? (
            <PlayerPreview
              id="playerTwo"
              username={this.state.playerTwo.name}
              avatar={this.state.playerTwo.image}
            >
              <a
                className="reset"
                onClick={this.onPlayerReset.bind(null, "playerTwo")}
              >
                Reset
              </a>
            </PlayerPreview>
          ) : (
            <PlayerInput
              onSubmit={this.onPlayerSubmit}
              id="playerTwo"
              label="Githubber Two"
            />
          )}
        </div>
        <div className="row">
          {playerOneName && playerTwoName ? (
            <Link
              className="button"
              to={{
                pathname: `${
                  match.url
                }/results/${playerOneName}/${playerTwoName}`,
              }}
            >
              Battle!
            </Link>
          ) : (
            <p>Submit Some Names To Fight!</p>
          )}
        </div>
      </div>
    );
  }
}
