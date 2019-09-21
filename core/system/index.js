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
      case 'park':
        this.addParking()
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

      const counterParkingSlot = /^\d+$/.test(parkingSlot) ? parseInt(parkingSlot) : 0
      const parkingData = []

      if (counterParkingSlot > 0) {
        for (let i = 0; i < counterParkingSlot; i++) {
          parkingData.push({
            registrationNumber: '',
            color: ''
          })
        }
      }

      const rawResult = Object.assign({}, this.result, {
        PARKING_SLOT: counterParkingSlot,
        PARKING_DATA: JSON.stringify(parkingData)
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
      this.resetParking()
    }
  }

  async addParking () {
    try {
      await this.readData()

      const parkingData = JSON.parse(this.result.PARKING_DATA) || []
      const parkingValue = this.config.value || {}
      const parkingAvailability = []

      // Checking parking value
      if (!parkingValue.registrationNumber || !parkingValue.color) {
        console.clear()
        console.error('Registration number and color must be filled')
        setTimeout(() => {
          closeApplication()
        }, 2000)

        return
      }

      // Checking availability slot and park vehicle
      let isParking = false

      for (let i = 0; i < parkingData.length; i++) {
        if (parkingData[i].registrationNumber === undefined || parkingData[i].registrationNumber === '' && !isParking) {
          parkingData[i] = {
            registrationNumber: parkingValue.registrationNumber,
            color: parkingValue.color
          }

          isParking = true
        }
      }

      // Set parking availability
      for (let j = 0; j < parkingData.length; j++) {
        if (parkingData[j].registrationNumber === undefined || parkingData[j].registrationNumber === '') {
          parkingAvailability.push(j)
        }
      }

      if (parkingAvailability.length === 0) {
        console.clear()
        console.error('Sorry, parking lot is full')
        setTimeout(() => {
          closeApplication()
        }, 2000)

        return
      }

      const rawResult = Object.assign({}, this.result, {
        PARKING_DATA: JSON.stringify(parkingData)
      })

      const result = this.getDataResult(rawResult)

      try {
        await this.fs.processCreate({
          message: result
        })
        
        console.clear()
        console.info('Success add parking slot')
        setTimeout(() => {
          closeApplication()
        }, 2000)
      } catch {
        console.clear()
        console.error('Failed add parking slot')
        setTimeout(() => {
          closeApplication()
        }, 2000)
      }
    } catch {}
  }

  async resetParking () {
    try {
      await this.fs.processCreate({
        resetData: true
      })
    } catch {}
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
    rawData.forEach(itemRawData => {
      result += itemRawData[0] ? `${itemRawData[0]}=${itemRawData[1]}\n` : ''
    })

    return result
  }
}

module.exports = (config) => {
  new ParkingLot(config)
}
