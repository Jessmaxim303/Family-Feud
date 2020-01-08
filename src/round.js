class Round {
  constructor(survey, player1, player2) {
    this.survey = survey.surveys;
    this.id = 0;
    this.question = survey.question;
    this.answers = survey.answers;
    this.respondents = survey.respondents;
    this.feedback = [];
    this.correctGuesses = 0;
    this.number = 0;
    this.surveyChances = 15;
  }

  randomSurveyQuestion() {
    this.number = Math.ceil(Math.random() * this.surveyChances);
    this.surveyChances--;
    this.id = this.survey[this.number - 1].id;
    return this.survey[this.number - 1];
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

  removeSurvey() {
    this.survey = this.survey.filter(x =>
      x.id !== this.id);
      console.log(this.survey);
  }
}

export default Round;
