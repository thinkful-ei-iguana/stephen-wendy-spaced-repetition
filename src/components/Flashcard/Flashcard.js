import React, { Component } from "react";
import WordContext from "../../contexts/WordContext";

class Flashcard extends Component {
  static contextType = WordContext;

  render() {
    const { word } = this.props;
    
    return (
      <>
        <p className="Flashcard__word">{word.nextWord}</p>
      </>
    );
  }
}

export default Flashcard;
