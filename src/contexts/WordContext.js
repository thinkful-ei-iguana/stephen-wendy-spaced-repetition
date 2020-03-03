import React, { Component } from "react";

const WordContext = React.createContext({
  words: [],
  language: {},
  nextWord: {},
  guess: "",
  responseObj: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setNext: () => {},
  setLanguage: () => {},
  setResponseObj: () => {},
  setWords: () => {},
  setGuess: () => {}
});

export default WordContext;

export class WordProvider extends Component {
  state = {
    words: [],
    language: {},
    nextWord: {},
    responseObj: {
      nextWord: "",
      prevWord: "",
      totalScore: 0,
      wordCorrectCount: 0,
      wordIncorrectCount: 0,
      answer: "",
      isCorrect: false,
      guess: "",
      setGuess: () => {}
    },
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
    this.setState({ nextWord });
  };
  setResponseObj = responseObj => {
    this.setState({ responseObj });
  };
  setLanguage = language => {
    this.setState({ language });
  };
  setWords = word => {
    this.setState([...this.state.words, word]);
  };
  setGuess = guess => {
    this.setState({ guess });
  };

  setPrev = word => {
    this.setState({ prevWord: word });
  };

  render() {
    const value = {
      words: this.state.words,
      language: this.state.language,
      nextWord: this.state.nextWord,
      guess: this.state.guess,
      responseObj: this.state.responseObj,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setNext: this.setNext,
      setResponseObj: this.setResponseObj,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setGuess: this.setGuess
      // setPrev: this.setPrev
    };

    return (
      <WordContext.Provider value={value}>
        {this.props.children}
      </WordContext.Provider>
    );
  }
}
