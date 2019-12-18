class Round {
  constructor(survey, player1, player2) {
    this.survey = survey.surveys;
    this.id = 0;
    this.question = survey.question;
    this.answers = survey.answers;
    this.respondents = survey.respondents;
    this.activePlayer = {};
    this.feedback = [];
  }

  randomSurveyQuestion() {
    this.id = Math.ceil(Math.random() * this.survey.length);
    return this.survey.filter(x => (x.id === this.id));
  }

  getAnswerById() {
    return this.answers.filter(x => (x.surveyId === this.id)).sort((a, b) => (b.respondents - a.respondents));
  }

  checkQuestion(guess) {
    console.log('workin still');
    this.answers.find(answer => {
      if(answer.answer.toLowerCase() === guess.toLowerCase()) {
        return answer.surveyId;
      } else {
        return false;
      }
    })
  }

  returnFeedback() {

  }

  submitNewGuess() {

  }
}

export default Round;
