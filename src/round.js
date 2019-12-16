class Round {
  constructor(survey, player1, player2) {
    this.survey = [{}]
    this.surveyId = survey.id
    this.question = survey.question;
    this.answers = [];
    this.respondents = survey.respondents;
    this.activePlayer = {};
    this.feedback = [];
  }

  randomSurveyQuestion() {

  }

  checkQuestion() {

  }

  returnFeedback() {

  }

  submitNewGuess() {

  }
}

export default Round;
