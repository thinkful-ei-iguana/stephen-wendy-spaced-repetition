import React, { Component } from "react";

import LanguageApiService from "../../services/language-api-service";
import WordContext from "../../contexts/WordContext";
import "./LearningRoute.css";
import Flashcard from "../../components/Flashcard/Flashcard";
import AnswerPopUp from "../../components/AnswerPopUp/AnswerPopUp";
import { Input, Label } from "../../components/Form/Form";
import Button from "../../components/Button/Button";

class LearningRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
    words: []
  };

  // handleResult = () => {
  //   const { history } = this.props;
  //   history.push("/learn");
  // };

  state = {
    error: null,
    submitted: false,
    guess: ""
  };

  static contextType = WordContext;

  componentWillMount() {
    this.context.clearError();
    LanguageApiService.getHead()
      .then(this.context.setNext)
      .catch(this.context.setError);
  }

  handleGuess = ev => {
    this.setState({
      guess: ev.target.value
    });
  };

  handleGuessSubmit = ev => {
    ev.preventDefault();
    const prevWord = this.context.nextWord.original;
    const guess = this.state.guess;
    this.context.setPrev(prevWord);
    console.log(prevWord);
    this.setState({
      submitted: true
    });
    LanguageApiService.postGuess({ guess: guess.value })
      .then(res => {
        this.context.setNext(res);
      })
      .then(word => {
        guess.value = "";
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  handleNext() {
    this.setState({ submitted: false });
  }

  renderScores() {
    const { nextWord } = this.context;
    return (
      <>
        <h3 className="Learning__Total">Total Score: {nextWord.totalScore}</h3>
        <div className="Learning__score">
          <h4 className="green-text">Correct: {nextWord.wordCorrectCount}</h4>
          <h4 className="red-text">Incorrect: {nextWord.wordIncorrectCount}</h4>
        </div>
      </>
    );
  }

  renderFlashcard() {
    const { nextWord } = this.context;
    return (
      <div>
        <Flashcard word={nextWord} />
      </div>
    );
  }

  render() {
    const { nextWord } = this.context;
    const { error } = this.state;

    return (
      <section>
        {this.renderScores()}

        {this.state.submitted && <AnswerPopUp handleNext={this.handleNext} />}

        <div className="Learning__Flashcard">
          {nextWord && this.renderFlashcard()}
        </div>
        <form className="Learning__Form" onSubmit={this.handleGuessSubmit}>
          <div role="alert">{error && <p>Something went wrong.{error}</p>}</div>

          <Label htmlFor="learn-guess-input">Translate the word above</Label>
          <Input
            id="learn-guess-input"
            type="text"
            name="guess"
            className="Learning__guess-input"
            onChange={ev => this.handleGuess(ev)}
            required
          />

          <Button type="submit">Check Word</Button>
        </form>
      </section>
    );
  }
}

export default LearningRoute;
