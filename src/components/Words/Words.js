import React, { Component } from "react";
import Word from "../../components/Word/Word";

class Words extends Component {
  render() {
    const { words } = this.props;
    console.log(words);
    return (
      <ul>
        {words.map(word => (
          <Word word={word} />
        ))}
      </ul>
    );
  }
}

export default Words;
