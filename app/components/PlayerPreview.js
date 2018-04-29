import React from "react";
import PropTypes from "prop-types";

export default function PlayerPreview(props) {
  return (
    <div>
      <div className="column">
        <img className="avatar" src={props.avatar} alt={props.username} />
        <h2 className="username">@{props.username}</h2>
        {props.children}
      </div>
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
