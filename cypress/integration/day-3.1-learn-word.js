/// <reference types="Cypress" />

/**
 * @abstract:Learn the meaning of the word
 *
 * @criteria
  When viewing the learning page as a logged in user:
  - The app gets my next word to learn details from the server
  - I'm shown the word to learn
  - I'm shown my current total score
  - I'm shown the number of correct and incorrect guesses for that word
  - I'm presented an input to type my answer/guess for the current words translation
*/
describe(`User story: Presented with word`, function() {
  beforeEach(() => {
    cy.server()
      .route({
        method: "GET",
        url: `/api/language/head`,
        status: 200,
        response: "fixture:language-head.json"
      })
      .as("languageHeadRequest");
  });

  it("displays the a flashcard with the next word", () => {
    cy.login()
      .visit(`/learn`)
      .wait("@languageHeadRequest");

    cy.fixture("language-head.json").then(languageHeadFixture => {
      cy.get("section").within($section => {
        cy.get("div.Learning__Flashcard").should(
          "contain",
          languageHeadFixture.nextWord
        );

        // cy.get("div.Learning__Flashcard").should(
        //   "contain",
        //   "Correct:" + languageHeadFixture.wordCorrectCount
        // );

        // cy.get("div.Learning__Flashcard").should(
        //   "contain",
        //   "Incorrect:" + languageHeadFixture.wordInCorrectCount
        // );
      });
    });
  });

  it(`displays a form for submitting the next guess`, () => {
    cy.login()
      .visit(`/learn`)
      .wait("@languageHeadRequest");

    cy.get("main form").within($form => {
      cy.get("label[for=learn-guess-input]").should(
        "have.text",
        `Translate the word above`
      );

      cy.get("input#learn-guess-input")
        .should("have.attr", "type", "text")
        .and("have.attr", "required", "required");

      cy.get("button[type=submit]").should("have.text", "Check Word");
    });
  });

  it(`displays the Total Score and correct and incorrect count for this word`, () => {
    cy.login()
      .visit(`/learn`)
      .wait("@languageHeadRequest");

    cy.fixture("language-head.json").then(languageHeadFixture => {
      cy.get("h3.Learning__Total").should(
        "have.text",
        `Total Score: ${languageHeadFixture.totalScore}`
      );
      cy.get("div.Flashcard__score").within($main => {
        cy.get("h4").should(
          "contain",
          `Correct: ${languageHeadFixture.wordCorrectCount}`,
          `Incorrect: ${languageHeadFixture.wordIncorrectCount} `
        );
      });
    });
  });
});
