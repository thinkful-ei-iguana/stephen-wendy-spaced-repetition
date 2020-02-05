import React, { Component } from "react";
import WordContext from "../../contexts/WordContext";
import Flashcard from "../../components/Flashcard/Flashcard";

class Flashcards extends Component {
  static contextType = WordContext;

  render() {
    const { words } = this.props;
    console.log(words);

    return (
      <>
        <p className="handwriting">
          {/* {words.map(word => (
            <Flashcard
              key={word.id}
              word={word.original}
              translation={word.translation}
              correct={word.correct_count}
              incorrect={word.incorrect_count}
            />
          ))} */}
          {words.original}
        </p>
      </>
    );
  }
}

export default Flashcards;
