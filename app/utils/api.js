import axios from "axios";

export function fetchPopularRepos(language) {
  const uri = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return axios.get(uri).then(res => res.data.items);
}

function fetchUserProfile(username) {
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then(res => res.data);
}

function fetchUserRepos(username) {
  return axios
    .get(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then(res => res.data);
}

function computeTotalStarCount(repos) {
  return repos.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function calculateScore(user, repos) {
  const followers = user.followers;
  const totalStars = computeTotalStarCount(repos);

  return followers * 3 + totalStars;
}

function handleError(err) {
  console.warn(error);

  return null;
}

function getUserData(player) {
  return Promise.all([fetchUserProfile(player), fetchUserRepos(player)]).then(
    ([user, repos]) => {
      return { user, score: calculateScore(user, repos) };
    }
  );
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players) {
  const promises = players.map(getUserData);

  return Promise.all(promises).then(sortPlayers);
}
