import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";

function LanguageList(props) {
  const languages = ["All", "Javascript", "Python", "Go", "Rust", "OCaml"];

  const items = languages.map(lang => {
    const style = lang === props.selectedLanguage ? { color: "red" } : {};

    return (
      <li style={style} key={lang} onClick={e => props.onClick(lang)}>
        {lang}
      </li>
    );
  });

  return <ul className="languages">{items}</ul>;
}

LanguageList.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Repo(props) {
  return (
    <li className="repo">
      <div className="repo-rank">#{props.rank}</div>
      <ul className="space-list-items">
        <li>
          <img className="avatar" src={props.avatar} />
        </li>
        <li>
          <a href={props.url}>{props.name}</a>
        </li>
        <li>@{props.owner}</li>
        <li>{props.stars} ⭐️</li>
      </ul>
    </li>
  );
}

Repo.propTypes = {
  name: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
};

function Repos(props) {
  const repos = props.repos.map((repo, index) => {
    return (
      <Repo
        key={repo.name}
        name={repo.name}
        rank={index + 1}
        avatar={repo.owner.avatar_url}
        url={repo.html_url}
        owner={repo.owner.login}
        stars={repo.stargazers_count}
      />
    );
  });
  return <ul className="repos-list">{repos}</ul>;
}

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
      repos: [],
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    fetchPopularRepos(this.state.selectedLanguage).then(repos => {
      this.setState({
        repos,
      });
    });
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      repos: [],
    });

    fetchPopularRepos(selectedLanguage).then(repos => {
      this.setState({
        repos,
      });
    });
  }

  render() {
    return (
      <div>
        <LanguageList
          selectedLanguage={this.state.selectedLanguage}
          onClick={this.updateLanguage}
        />
        {this.state.repos.length > 0 ? (
          <Repos repos={this.state.repos} />
        ) : (
          <p>Loading Repos...</p>
        )}
      </div>
    );
  }
}

export default Popular;
