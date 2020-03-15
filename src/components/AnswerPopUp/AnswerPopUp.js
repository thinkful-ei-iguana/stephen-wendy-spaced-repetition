import React, { Component } from "react";
// import LanguageApiService from "../../services/language-api-service";
import WordContext from "../../contexts/WordContext";
import Button from "../Button/Button";
import "./AnswerPopUp.css";

class AnswerPopUp extends Component {
  state = {
    error: null,
    submitted: true
  };

  static contextType = WordContext;

  handleNext = () => {
    this.setState({ submitted: false });
  };

  renderCorrect() {
    const { nextWord, responseObj } = this.context;

    return (
      <div className="AnswerPopUp__correct">
        <h3 className="AnswerPopUp__subtitle">Correct!</h3>

        <p className="AnswerPopUp__text">
          The correct translation for {nextWord.nextWord} is{" "}
          {responseObj.answer}!
        </p>

        <p className="AnswerPopUp__score">
          Your total score is now: {responseObj.totalScore}
        </p>
        <p className="AnswerPopUp__score">
          Correct count {nextWord.nextWord}: {nextWord.wordCorrectCount + 1}
        </p>
        <p className="AnswerPopUp__score">
          Incorrect count for {nextWord.nextWord}: {nextWord.wordIncorrectCount}
        </p>
        <Button className="AnswerPopUp__button" onClick={this.handleNext}>
          Next word
        </Button>
      </div>
    );
  }

  renderIncorrect() {
    const { nextWord, guess, responseObj } = this.context;

    return (
      <div className="AnswerPopUp">
        <h3 className="AnswerPopUp__subtitle">
          Good try, but not quite right.
        </h3>

        <div className="AnswerPopUp__text">
          The correct translation for {nextWord.nextWord} is{" "}
          <p className="correction-emphasis">{responseObj.answer}</p> and you
          wrote "{guess}".
        </div>

        <p className="AnswerPopUp__score">
          Your total score is: {nextWord.totalScore}
        </p>
        <p className="AnswerPopUp__score">
          Correct count for {nextWord.nextWord}: {nextWord.wordCorrectCount}
        </p>
        <p className="AnswerPopUp__score">
          Incorrect count for {nextWord.nextWord}:{" "}
          {nextWord.wordIncorrectCount + 1}
        </p>

        <Button
          className="AnswerPopUp__button"
          onClick={() => this.handleNext()}
        >
          Next word
        </Button>
      </div>
    );
  }

  render() {
    const { responseObj } = this.context;
    const { submitted } = this.state;
    return (
      <>
        {submitted && (
          <div className="AnswerPopUp">
            {responseObj.isCorrect
              ? this.renderCorrect()
              : this.renderIncorrect()}
          </div>
        )}
      </>
    );
  }
}

export default AnswerPopUp;
