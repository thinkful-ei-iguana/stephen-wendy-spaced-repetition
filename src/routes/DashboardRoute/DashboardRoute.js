import React, { Component } from "react";
import Button from "../../components/Button/Button";
// import WordContext from "../../contexts/WordContext";
import "./DashboardRoute";
class DashboardRoute extends Component {
  state = {
    expanded: false
  };

  // static contextType = WordContext;

  handleSetActiveType = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };

  componentDidMount() {
    //api call to word table, get words, translation, correct and incorrect count and next, see render methods below
  }

  renderPracticeWords(expanded) {
    return (
      <div className="Dashboard__section">
        <Button
          className="Dashboard__words"
          onClick={() => this.handleSetActiveType()}
        >
          View My Words
        </Button>
      </div>
    );
  }

  renderCorrectCount() {}
  renderWrongCount() {}
  render() {
    return (
      <section>
        <h2>Learn Hungarian!</h2>
        <h3>Total score: {}</h3>
        <h3>Words to Practice</h3>
        <Button type="submit">Start practicing</Button>
      </section>
    );
  }
}

export default DashboardRoute;
