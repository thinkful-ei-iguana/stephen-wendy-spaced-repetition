import React, { Component } from "react";

import LanguageApiService from "../../services/language-api-service";
import WordContext from "../../contexts/WordContext";
import "./LearningRoute.css";
import Flashcard from "../../components/Flashcard/Flashcard";
import { Input, Label } from "../../components/Form/Form";
import Button from "../../components/Button/Button";

class LearningRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
    words: []
  };

  state = {
    error: null,
    submitted: false,
    nextWord: false
  };

  static contextType = WordContext;

  componentDidMount() {
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
    const { guess } = ev.target;

    this.context.setGuess(guess.value);

    LanguageApiService.postGuess(guess.value.toLowerCase())
      .then(response => {
        this.context.setResponseObj(response);
      })
      .then(() => {
        guess.value = "";
      })
      .catch(this.context.setError);

    this.setState({
      submitted: true
    });
  };

  handleNext = () => {
    this.context.clearError();
    LanguageApiService.getHead()
      .then(this.context.setNext)
      .catch(this.context.setError);

    this.setState({ nextWord: true, submitted: false });
    this.context.clearGuess();
  };

  renderScores() {
    const { nextWord, responseObj } = this.context;
    return (
      <>
        <h3 className="Learning__Total">
          {responseObj.totalScore
            ? `Total Score: ${responseObj.totalScore}`
            : `Total Score: ${nextWord.totalScore}`}
        </h3>
      </>
    );
  }

  renderFlashcard() {
    const { nextWord, responseObj, guess } = this.context;
    const { submitted } = this.state;
    return (
      <Flashcard
        className="Flashcard__response"
        word={nextWord}
        response={responseObj}
        guess={guess}
        submitted={submitted}
        next={this.handleNext}
      />
    );
  }

  render() {
    const { error, submitted } = this.state;

    return (
      <section>
        {this.renderScores()}

        <div className="Learning__Flashcard">{this.renderFlashcard()}</div>
        <form className="Learning__Form" onSubmit={this.handleGuessSubmit}>
          <div role="alert">
            {error && <p>Something went wrong. {error}</p>}
          </div>

          {!submitted && (
            <Label htmlFor="learn-guess-input">Translate the word above</Label>
          )}
          {!submitted && (
            <Input
              id="learn-guess-input"
              type="text"
              name="guess"
              className="Learning__guess-input"
              onChange={ev => this.handleGuess(ev)}
              required
            />
          )}
          {!submitted && <Button type="submit">Check Word</Button>}
        </form>
      </section>
    );
  }
}

export default LearningRoute;
