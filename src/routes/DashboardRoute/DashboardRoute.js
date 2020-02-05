import React, { Component } from "react";
import { Link } from "react-router-dom";
import Words from "../../components/Words/Words";
import Button from "../../components/Button/Button";
import LanguageApiService from "../../services/language-api-service";
import WordContext from "../../contexts/WordContext";
import "./DashboardRoute.css";
class DashboardRoute extends Component {
  static defaultProps = {
    words: []
  };

  state = {
    expanded: false
  };

  static contextType = WordContext;

  handleSetActiveType = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };

  componentWillMount() {
    this.context.clearError();
    LanguageApiService.getLanguage()
      .then(this.context.setLanguage)
      .catch(this.context.setError);
  }

  renderWordList() {
    const { language } = this.context;
    return (
      <div>
        <Words words={language.words} />
      </div>
    );
  }

  render() {
    const { language } = this.context;
    const { expanded } = this.state;
    return (
      <section>
        {language.language && (
          <div className="Dashboard__headers">
            <h2 aria-label={"Learn" + language.language.name}>
              Learn {language.language.name}!
            </h2>
            {language.language.total_score === 0 ? (
              `You have no score yet. Click on Start practicing!`
            ) : (
              <h3
                aria-label={
                  "Your total score is" + language.language.total_score
                }
              >
                Total score: {language.language.total_score}
              </h3>
            )}
          </div>
        )}
        <div className="Dashboard__button-container">
          <Button
            className="Dashboard__words"
            onClick={() => this.handleSetActiveType()}
          >
            View My Words
          </Button>

          <Link to="/learn">
            <Button type="submit">Start practicing</Button>
          </Link>
        </div>
        {expanded && (
          <h4 className="Dash__titles">
            <div>Words</div>
            <div># Correct</div>
            <div># Incorrect</div>
          </h4>
        )}
        {expanded && this.renderWordList()}
      </section>
    );
  }
}

export default DashboardRoute;
