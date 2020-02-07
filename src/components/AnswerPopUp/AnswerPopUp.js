import React, { Component } from "react";
// import LanguageApiService from "../../services/language-api-service";
import WordContext from "../../contexts/WordContext";
import Button from "../Button/Button";
import "./AnswerPopUp.css";

class AnswerPopUp extends Component {
  state = {
    error: null
  };

  static contextType = WordContext;

  // componentWillMount() {
  //   this.context.clearError();
  //   LanguageApiService.postGuess()
  //     .then(this.context.setNext)
  //     .catch(this.context.setError);
  // }

  renderCorrect() {
    const { prevWord, nextWord, guess } = this.context;

    return (
      <div className="AnswerPopUp__correct">
        <h3 className="AnswerPopUp__subtitle">You were correct! :D</h3>

        <p className="AnswerPopUp__text">
          The correct translation for {prevWord} was {nextWord.translation} and
          you chose {guess}.
        </p>

        <p className="AnswerPopUp__score">
          Your total score is: {nextWord.totalScore}
        </p>

        <Button className="AnswerPopUp__button">Try another word!</Button>
      </div>
    );
  }

  renderIncorrect() {
    const { prevWord, nextWord, guess } = this.context;

    return (
      <div className="AnswerPopUp__incorrect">
        <h3 className="AnswerPopUp__subtitle">
          Good try but not quite right :(
        </h3>

        <p className="AnswerPopUp__text">
          The correct translation for {prevWord} was {nextWord.translation} and
          you chose {guess}
        </p>

        <p className="AnswerPopUp__score">
          Your total score is: {nextWord.totalScore}
        </p>

        <Button>Next word!</Button>
      </div>
    );
  }

  render() {
    const { nextWord } = this.context;
    return (
      <div className="AnswerPopUp">
        {nextWord.isCorrect ? this.renderCorrect() : this.renderIncorrect()}
      </div>
    );
  }
}

export default AnswerPopUp;
