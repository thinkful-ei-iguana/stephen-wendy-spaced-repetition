import React, { Component } from "react";

const WordContext = React.createContext({
  words: [],
  language: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setLanguage: () => {},
  setWords: () => {}
});

export default WordContext;

export class WordProvider extends Component {
  state = {
    words: [],
    language: {},
    error: null
  };
  setError = error => {
    console.error(error);
    this.setState({ error });
  };
  clearError = () => {
    this.setState({ error: null });
  };
  setLanguage = language => {
    this.setState({ language });
  };
  setWords = word => {
    this.setState([...this.state.words, word]);
  };

  render() {
    const value = {
      words: this.state.words,
      language: this.state.language,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setLanguage: this.setLanguage,
      setWords: this.setWords
    };
    return (
      <WordContext.Provider value={value}>
        {this.props.children}
      </WordContext.Provider>
    );
  }
}
