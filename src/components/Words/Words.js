import React, { Component } from "react";
import WordContext from "../../contexts/WordContext";

class Words extends Component {
  static contextType = WordContext;

  render() {
    const { words } = this.props;

    return (
      <>
        <ul>
          {words.map((word, idx) => (
            <li key={idx}>
              <h4 className="Word_word">{word.original}</h4>

              <div className="Correct_correct">{word.correct_count}</div>

              <div className="Incorrect_incorrect">{word.incorrect_count}</div>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Words;
