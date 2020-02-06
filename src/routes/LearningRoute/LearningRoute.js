import React, { Component } from "react";
import { Input, Label } from "../../components/Form/Form";
import Flashcard from "../../components/Flashcard/Flashcard";
import Button from "../../components/Button/Button";
import LanguageApiService from "../../services/language-api-service";
import WordContext from "../../contexts/WordContext";
import "./LearningRoute.css";
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

  state = { error: null };

  static contextType = WordContext;

  componentWillMount() {
    this.context.clearError();
    LanguageApiService.getHead()
      .then(this.context.setNext)
      .catch(this.context.setError);
  }

  handleGuessSubmit = ev => {
    ev.preventDefault();
    const { guess } = ev.target;
    console.log(guess.value);
    LanguageApiService.postGuess({ guess: guess.value })
      .then(word => {
        guess.value = "";
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

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
  //need componentdidupdate

  render() {
    const { nextWord } = this.context;
    const { error } = this.state;

    return (
      <section>
        {this.renderScores()}

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
            required
          />

          <Button
            type="submit"
            //  onClick={this.handleResult}
          >
            Check Word
          </Button>
        </form>
      </section>
    );
  }
}

export default LearningRoute;
