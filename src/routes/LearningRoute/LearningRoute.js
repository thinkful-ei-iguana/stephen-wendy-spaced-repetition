import React, { Component } from "react";
import Flashcards from "../../components/Flashcards/Flashcards";
import Button from "../../components/Button/Button";
import LanguageApiService from "../../services/language-api-service";
import WordContext from "../../contexts/WordContext";
import "./LearningRoute.css";
class LearningRoute extends Component {
  static defaultProps = {
    words: []
  };
  state = {
    guess: ""
  };
  static contextType = WordContext;

  componentWillMount() {
    this.context.clearError();
    LanguageApiService.getLanguage()
      .then(this.context.setLanguage)
      .catch(this.context.setError);
  }

  handleGuessSubmit(e) {
    
  }

  renderFlashcards() {
    const { language } = this.context;
    return (
      <div>
        <Flashcards words={language.words[0]} />
      </div>
    );
  }

  handleChange(event) {
    this.setState({ guess: event.target.value });
  }

  render() {
    const { language } = this.context;
    return (
      <section>
        <h4>Translate the word:</h4>

        <div className="Learning__Flashcard">
          {language.words && this.renderFlashcards()}
        </div>
        <div className="Learning__Form">
          <form>
            <input
              type="text"
              name="guess"
              value={this.state.guess}
              onChange={() => this.handleChange()}
            />
            <Button type="submit">Check Word</Button>
          </form>
        </div>
      </section>
    );
  }
}

export default LearningRoute;
