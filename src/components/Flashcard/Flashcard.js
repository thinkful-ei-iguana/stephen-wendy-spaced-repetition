import React, { Component } from "react";

class Flashcard extends Component {
  render() {
    const { word } = this.props;
    return (
      <div className="Word__word-container">
        <li aria-label={word} tabIndex="0" className="Word__word">
          {word}
        </li>
      </div>
    );
  }
}

export default Flashcard;
