const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule()

module.exports = (config) => {
  return new Promise((resolve, reject) => {
    if(!config) {
      reject()
    }
    
    prompt({
      name: 'questionId',
      message: 'Messages',
      type: 'checkbox',
      choices: [
        'Pizza',
        'Egg',
        'Mango'
      ]
    })
      .then((value) => {
        console.info('hehe : ', value)
        resolve(value)
      })
      .catch((value) => {
        console.info('errr : ', value)
        reject(value)
      })
  })
}