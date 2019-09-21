const { exec } = require('child_process')

class CloseApplication {
  constructor () {
    exec('clear', (error) => {
      if (error) {
        return
      }
      console.clear()
      console.info('Closing application...')
    })
    
    setTimeout(() => {
      exec('clear', (error) => {
        if (error) {
          return
        }
        console.clear()
        console.info('Thank you :)')
        process.exit(0)
      })
    }, 3000)
  }
}

module.exports = () => {
  new CloseApplication()
}
