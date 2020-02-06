import React, { Component } from "react";

const WordContext = React.createContext({
  words: [],
  language: {},
  nextWord: {},
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
    nextWord: {},
    prevWord: '',
    guess: '',
    error: null
  };
  setError = error => {
    console.error(error);
    this.setState({ error });
  };
  clearError = () => {
    this.setState({ error: null });
  };
  setNext = nextWord => {
    this.setState(
      { nextWord });
  };
  setLanguage = language => {
    this.setState({ language });
  };
  setWords = word => {
    this.setState([...this.state.words, word]);
  };
  setPrevWord = () => {
    this.setState({
      prevWord: this.state.nextWord.original
    });
  };
  setGuess = guess => {
    this.setState({ guess });
  };

  render() {
    const value = {
      words: this.state.words,
      language: this.state.language,
      nextWord: this.state.nextWord,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setNext: this.setNext,
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
