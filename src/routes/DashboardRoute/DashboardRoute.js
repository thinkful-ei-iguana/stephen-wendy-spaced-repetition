import React, { Component } from "react";
import Words from "../../components/Words/Words";
import Button from "../../components/Button/Button";
import LanguageApiService from "../../services/language-api-service";
import WordContext from "../../contexts/WordContext";
import "./DashboardRoute";
class DashboardRoute extends Component {
  static contextType = WordContext;

  componentDidMount() {
    //api call to word table, get words, translation, correct and incorrect count and next, see render methods below
    this.context.clearError();
    LanguageApiService.getLanguage()
      .then(this.context.setLanguage)
      .catch(this.context.setError);
  }

  renderCorrectCount() {}
  renderWrongCount() {}
  render() {
    const { language } = this.context;
    console.log(language.words);
    return (
      <section>
        <h2>Learn {}</h2>
        <h3>Total score: {}</h3>
        <h3>Words to Practice</h3>
        <Button className="Dashboard__words">View My Words</Button>
        <Words words={language.words} />;
        <Button type="submit">Start practicing</Button>
      </section>
    );
  }
}

export default DashboardRoute;
