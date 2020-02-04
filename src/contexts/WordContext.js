import React, { Component } from "react";

const WordContext = React.createContext({
  word: "",
  error: null,
  setError: () => {},
  clearError: () => {},
  setWord: () => {}
});

export default WordContext;

export class WordProvider extends Component {
  state = {
    word: "",
    error: null
  };
  setError = error => {
    console.error(error);
    this.setState({ error });
  };
  clearError = () => {
    this.setState({ error: null });
  };
  setWord = word => {
    this.setState({ word });
  };

  render() {
    const value = {
      user: this.state.word,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setWord: this.setWord
    };
    return (
      <WordContext.Provider value={value}>
        {this.props.children}
      </WordContext.Provider>
    );
  }
}
