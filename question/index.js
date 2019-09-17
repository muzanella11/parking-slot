const { questionProcess } = require('./../config')
const questionList = [
  {
    name: 'questionId',
    message: 'Messages',
    type: 'checkbox',
    choices: [
      'Pizza',
      'Egg',
      'Mango'
    ]
  }
]
const runQuestions = () => {
  questionProcess(questionList)
}

module.exports = {
  runQuestions
}