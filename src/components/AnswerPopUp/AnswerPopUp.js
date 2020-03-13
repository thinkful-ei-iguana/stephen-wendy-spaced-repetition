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

  renderCorrect() {
    const { nextWord, responseObj } = this.context;

    return (
      <div className="AnswerPopUp__correct">
        <h3 className="AnswerPopUp__subtitle">You were correct! :D</h3>

        <p className="AnswerPopUp__text">
          The correct translation for {nextWord.nextWord} is {responseObj.answer}!
        </p>

        <p className="DisplayScore">Your total score is: {responseObj.totalScore}</p>

        <Button className="AnswerPopUp__button" onClick={() => this.props.handleNext()}>Try another word!</Button>
      </div>
    );
  }

  renderIncorrect() {
    const { nextWord, responseObj } = this.context;

    console.log(responseObj);
    return (
      <div className="AnswerPopUp__incorrect">
        <h3 className="AnswerPopUp__subtitle">
          Good try but not quite right :(
        </h3>

        <p className="AnswerPopUp__text">
          The correct translation for {nextWord.nextWord} is {responseObj.answer} and you chose {this.props.guess}.
        </p>

        <p className="DisplayScore">Your total score is: {responseObj.totalScore}</p>

        <Button onClick={() => this.props.handleNext()}>Next word!</Button>
      </div>
    );
  }

  render() {
    const { responseObj } = this.context;
    return (
      <div className="AnswerPopUp">
        {responseObj.isCorrect ? this.renderCorrect() : this.renderIncorrect()}
      </div>
    );
  }
}

export default AnswerPopUp;
