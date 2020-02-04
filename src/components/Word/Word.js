import React, { Component } from "react";

class Word extends Component {
  render() {
    console.log(this.props);
    return <li>{this.props.word.correct_count}</li>;
  }
}

export default Word;
