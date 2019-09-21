const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule()

module.exports = (config) => {
  return new Promise((resolve, reject) => {
    if(!config) {
      reject()
    }
    
    prompt(config)
      .then((value) => {
        resolve(value)
      })
      .catch((value) => {
        reject(value)
      })
  })
}
