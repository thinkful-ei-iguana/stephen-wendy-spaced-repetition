import React, { Component } from "react";
import WordContext from "../../contexts/WordContext";
import Word from "../../components/Word/Word";

class Words extends Component {
  static contextType = WordContext;

  render() {
    const { words } = this.props;
    return (
      <>
        <ul>
          {words.map(word => (
            <Word
              key={word.id}
              word={word.original}
              translation={word.translation}
              correct={word.correct_count}
              incorrect={word.incorrect_count}
            />
          ))}
        </ul>
      </>
    );
  }
}

export default Words;