const fileSystem = require('./fileSystem')
const closeApplication = require('./closeApplication')

class ParkingLot {
  constructor (config) {
    this.fs = new fileSystem
    this.config = config || {}
    this.result = undefined
    this.parkingSlot = config.parkingSlot || 0
    this.parkingData = config.parkingData || []

    switch (this.config.command) {
      case 'create':
        this.createParkingSlot()
        break
      case 'status':
        this.readParkingSlot()
        break
      case 'close':
        closeApplication()
        break
      default:
        console.clear()
        console.info('Parking Lot system :)')
        setTimeout(() => {
          closeApplication()
        }, 2000)
        break
    }
  }

  async createParkingSlot () {
    const parkingSlot = this.parkingSlot

    try {
      await this.readData()

      const rawResult = Object.assign({}, this.result, {
        PARKING_SLOT: /^\d+$/.test(parkingSlot) ? parseInt(parkingSlot) : 0
      })

      const result = this.getDataResult(rawResult)

      try {
        await this.fs.processCreate({
          message: result
        })
        
        console.clear()
        console.info('Success creating parking slot')
        setTimeout(() => {
          closeApplication()
        }, 2000)
      } catch {
        console.clear()
        console.error('Failed creating parking slot')
        setTimeout(() => {
          closeApplication()
        }, 2000)
      }
    } catch {
      try {
        await this.fs.processCreate({
          resetData: true
        })
      } catch {}
    }
  }

  async readParkingSlot () {
    try {
      await this.readData()
    } catch {}
  }

  readData () {
    return new Promise((resolve, reject) => {
      this.fs.processRead().then(res => {
        this.result = res
        this.parkingSlot = parseInt(this.getParkingObject(this.result, 'PARKING_SLOT'))
        this.parkingData = JSON.parse(this.getParkingObject(this.result, 'PARKING_DATA'))

        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  getParkingObject (rawData, obj) {
    if (!rawData[obj]) {
      console.clear()
      console.info('Something wrong :(')
      setTimeout(() => {
        closeApplication()
      }, 2000)
      
      return
    }

    return rawData[obj]
  }

  getDataResult (rawResult) {
    const rawData = Object.entries(rawResult)

    let result = ''
    rawData.forEach(itemRawDara => {
      result += itemRawDara[0] ? `${itemRawDara[0]}=${itemRawDara[1]}\n` : ''
    })

    return result
  }
}

module.exports = (config) => {
  new ParkingLot(config)
}
