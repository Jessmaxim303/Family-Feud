class Round {
  constructor(survey, player1, player2) {
    this.survey = survey.surveys;
    this.id = 0;
    this.question = survey.question;
    this.answers = survey.answers;
    this.respondents = survey.respondents;
    this.feedback = [];
    this.correctGuesses = 0;
    this.surveyChances =
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  }

  randomSurveyQuestion() {
    this.id = Math.ceil(Math.random() * this.surveyChances.length);
    this.surveyChances.splice(this.id - 1, 1);
    return this.survey[this.id - 1];
  }

  getAnswerById() {
    return this.answers.filter(x => (x.surveyId === this.id)).sort((a, b) => (b.respondents - a.respondents));
  }

  checkQuestion(guess) {
    if (this.answers.find(answer => answer.answer.toLowerCase().split(' ').join('') === guess)) {
      this.correctGuesses++;
      return this.answers.find(answer => answer.answer.toLowerCase().split(' ').join('') === guess)
    }
  };

  returnFeedback() {

  }
}

export default Round;
