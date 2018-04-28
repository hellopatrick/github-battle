import React from "react";
import PropTypes from "prop-types";

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

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
    });
  }

  render() {
    return (
      <div>
        <LanguageList
          selectedLanguage={this.state.selectedLanguage}
          onClick={this.updateLanguage}
        />
      </div>
    );
  }
}

export default Popular;
