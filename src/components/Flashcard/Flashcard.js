import React, { Component } from "react";
import WordContext from "../../contexts/WordContext";

class Flashcard extends Component {
  static contextType = WordContext;

  renderIncorrectResponse() {
    const { word, response } = this.props;
    return (
      <>
        <p className="Flashcard__response">Good try, but not quite right :(</p>
        <p>
          The correct translation for "{word.nextWord}" is "{response.answer}"
        </p>
        <button>Next Word</button>
      </>
    );
  }
  renderCorrectResponse() {}

  render() {
    const { word, response } = this.props;
    console.log(response);
    return (
      <>
        <p className="Flashcard__word">{word.nextWord}</p>
      </>
    );
  }
}

export default Flashcard;
