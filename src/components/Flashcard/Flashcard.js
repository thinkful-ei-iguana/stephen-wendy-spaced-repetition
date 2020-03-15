import React, { Component } from "react";
import WordContext from "../../contexts/WordContext";
import LanguageApiService from "../../services/language-api-service";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Flashcard.css";
class Flashcard extends Component {
  static contextType = WordContext;

  state = {
    error: null,
    nextWord: false
  };

  renderCorrect() {
    const { response } = this.props;

    return (
      <div className="Flashcard__response">
        <h3 className="response__header green-text">Correct!</h3>

        <div className="DisplayFeedback">
          The correct translation is{" "}
          <p className="correction-emphasis">{response.answer}</p>
        </div>

        <h4>Your total score is now: {response.totalScore}</h4>

        <Button className="next-button" onClick={this.props.next}>
          Next word
        </Button>
      </div>
    );
  }

  renderIncorrect() {
    const { word, guess, response } = this.props;

    return (
      <>
        <div className="Flashcard__response">
          <h3 className="response__header red-text">
            Good try, but not quite right.
          </h3>

          <div className="DisplayFeedback">
            You guessed <span className="incorrect-guess">{guess}</span>, and
            the correct translation is{" "}
            <p className="correction-emphasis">{response.answer}</p>
          </div>
          <h4>Total score: {response.totalScore}</h4>
          <div className="response-score">
            <div>
              <FontAwesomeIcon icon={faCheck} className="icon green-text" />{" "}
              {word.wordCorrectCount}
            </div>
            <div>
              <FontAwesomeIcon icon={faTimes} className="icon red-text" />{" "}
              {word.wordIncorrectCount + 1}
            </div>
          </div>
          <Button className="next-button" onClick={this.props.next}>
            Next word
          </Button>
        </div>
      </>
    );
  }

  renderThisWord() {
    const { word } = this.props;

    return (
      <>
        <div className="Flashcard__score">
          <h4 className="green-text">Correct: {word.wordCorrectCount}</h4>
          <h4 className="red-text">Incorrect: {word.wordIncorrectCount}</h4>
        </div>
        <p className="Flashcard__word">{word.nextWord}</p>
      </>
    );
  }

  renderNextWord() {
    const { response } = this.props;
    return (
      <>
        <div className="Flashcard__score">
          <h4 className="green-text">Correct: {response.wordCorrectCount}</h4>
          <h4 className="red-text">Incorrect: {response.wordIncorrectCount}</h4>
        </div>
        <p className="Flashcard__word">{response.nextWord}</p>
      </>
    );
  }

  render() {
    const { response } = this.props;
    const { guess } = this.context;
    const { nextWord } = this.state;

    return (
      <>
        {guess && (
          <div className="Flashcard__response">
            {response.isCorrect ? this.renderCorrect() : this.renderIncorrect()}
          </div>
        )}

        {!guess && (
          <div className="Flashcard__response">
            {nextWord ? this.renderNextWord() : this.renderThisWord()}
          </div>
        )}
      </>
    );
  }
}

export default Flashcard;
