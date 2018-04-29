import React from "react";
import { battle } from "../utils/api";

import PlayerPreview from "./PlayerPreview";

function PlayerInfo({ label, score, user }) {
  const profile = (
    <ul>
      <li>{user.name}</li>
      <li>{user.location}</li>
      <li>Followers: {user.followers}</li>
      <li>Following: {user.following}</li>
      <li>Public Repos: {user.public_repos}</li>
    </ul>
  );

  return (
    <div className="column">
      <h1>{label}!</h1>
      <h3>Score: {score}</h3>
      <PlayerPreview
        avatar={user.avatar_url}
        username={user.login}
        id={user.login}
      >
        {profile}
      </PlayerPreview>
    </div>
  );
}

export default class BattleResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = { winner: null, loser: null, error: null, loading: true };
  }

  componentDidMount() {
    const { location, match } = this.props;
    const { params } = match;
    const { one, two } = params;

    battle([one, two]).then(players => {
      if (players === null) {
        this.setState({
          winner: null,
          loser: null,
          error: "Check Github API!",
          loading: false,
        });
      } else {
        const [winner, loser] = players;

        this.setState({
          winner,
          loser,
          loading: false,
        });
      }
    });
  }

  render() {
    const { error, winner, loser, loading } = this.state;

    if (loading) {
      return <p>Fighting...</p>;
    } else {
      if (error) {
        return <p>{error}</p>;
      } else {
        return (
          <div className="row">
            <PlayerInfo
              label="winner"
              score={winner.score}
              user={winner.user}
            />
            <PlayerInfo label="loser" score={loser.score} user={loser.user} />
          </div>
        );
      }
    }
  }
}
