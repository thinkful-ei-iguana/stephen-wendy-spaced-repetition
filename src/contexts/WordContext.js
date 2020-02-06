import React, { Component } from "react";

const WordContext = React.createContext({
  words: [],
  language: {},
  nextWord: {},
  prevWord: '',
  error: null,
  setError: () => {},
  clearError: () => {},
  setLanguage: () => {},
  setWords: () => {},
  setPrev: () => {}
});

export default WordContext;

export class WordProvider extends Component {
  state = {
    words: [],
    language: {},
    nextWord: {},
    error: null
  }
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
  setPrev = () => {
    this.setState({ prevWord: this.state.nextWord.original })
  };

  render() {
    const value = {
      words: this.state.words,
      language: this.state.language,
      nextWord: this.state.nextWord,
      prevWord: this.state.prevWord,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setNext: this.setNext,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setPrev: this.setPrev,
      setGuess: this.setGuess
    };
    return (
      <WordContext.Provider value={value}>
        {this.props.children}
      </WordContext.Provider>
    );
  }
}
