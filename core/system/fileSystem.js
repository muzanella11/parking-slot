const fs = require('fs')
const pathParkingData = './core/data/parking-data.txt'
const closeApplication = require('./closeApplication')

class FileSystem {
  constructor (config) {
    this.config = config || {}
    this.result = undefined
    this.initContentFile = 'PARKING_SLOT=0\nPARKING_DATA="[]"'
  }

  checkFileExist () {
    return new Promise((resolve, reject) => {
      fs.access(pathParkingData, fs.F_OK, (err) => {
        if (err) {
          reject(err)
        }
        
        resolve()
      })
    })
  }

  async readFileData () {
    try {
      await this.checkFileExist()
      const fileData = fs.readFileSync(pathParkingData, 'utf8', (err) => {
        if (err) {
          console.clear()
          console.error('Something wrong when reading file :(')
          setTimeout(() => {
            closeApplication()
          }, 2000)

          return
        }
      })
      const rawData = fileData.split('\n')
      const mapData = rawData.map((itemFileData) => {
        const data = itemFileData.split('=')
        return {
          key: data[0],
          value: data[1]
        }
      })
      const result = mapData.reduce((obj, item) => {
        obj[item.key] = item.value
        return obj
      }, {})

      return result
    } catch (error) {
      fs.writeFileSync(pathParkingData, this.initContentFile)
      return {}
    }
  }

  async createFileData () {
    try {
      await this.checkFileExist()

      if (this.config.resetData) {
        this.config.message = this.initContentFile
      }

      if (!this.config.message) {
        console.clear()
        console.error('Something wrong when creating file :( asdasd')
        setTimeout(() => {
          closeApplication()
        }, 2000)

        return
      }

      fs.writeFileSync(pathParkingData, this.config.message, (err) => {
        if (err) {
          console.clear()
          console.error('Failed write data :(')
          setTimeout(() => {
            closeApplication()
          }, 2000)

          return
        }
      })
    } catch (error) {
      console.clear()
      console.error('File not found')
      setTimeout(() => {
        closeApplication()
      }, 1000)
    }
  }

  async processRead () {
    try {
      return await this.readFileData()
    } catch (error) {
      return error
    }
  }

  async processCreate (config) {
    try {
      this.config = config

      await this.createFileData()
    } catch (error) {
      return error
    }
  }
}

module.exports = FileSystem
