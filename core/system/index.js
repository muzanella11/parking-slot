const fileSystem = require('./fileSystem')
const closeApplication = require('./closeApplication')

class ParkingLot {
  constructor (config) {
    this.config = config || {}
    this.result = undefined
    this.parkingSlot = 0
    this.parkingData = []
    
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

  createParkingSlot () {
    console.info('create parking slot')

    fileSystem({
      command: 'create'
    })
  }

  async readParkingSlot () {
    const fs = new fileSystem({
      command: 'read'
    })

    try {
      this.result = await fs.processRead()
    } catch (error) {
      this.result = error
    }

    this.parkingSlot = parseInt(this.getParkingObject(this.result, 'PARKING_SLOT'))
    this.parkingData = JSON.parse(this.getParkingObject(this.result, 'PARKING_DATA'))
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
}

module.exports = (config) => {
  new ParkingLot(config)
}
