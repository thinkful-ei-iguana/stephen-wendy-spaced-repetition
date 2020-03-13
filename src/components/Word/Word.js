import React, { Component } from "react";
import "./Word.css";
class Word extends Component {
  formatCorrectScore() {
    const { correct, word } = this.props;
    return (
      <li
        aria-label={correct + "correct guesses for" + word}
        tabIndex="1"
        className="Word__correct"
      >
        {correct}
      </li>
    );
  }

  formatIncorrectScore() {
    const { incorrect, word } = this.props;

    return (
      <li
        aria-label={incorrect + "incorrect guesses for" + word}
        tabIndex="2"
        className="Word__correct"
      >
        {incorrect}
      </li>
    );
  }
  render() {
    const { word } = this.props;

    return (
      <div className="Word__word-container">
        <li aria-label={word} tabIndex="0" className="Word__word">
          {word}
        </li>
        {this.formatCorrectScore()}
        {this.formatIncorrectScore()}
      </div>
    );
  }
}

export default Word;