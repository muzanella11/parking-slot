const { questionProcess } = require('./../config')
const ParkingLot = require('./../core/system')

// Question
const menuQuestion = [
  {
    name: 'menuParking',
    message: 'Welcome in Parking Lot',
    type: 'list',
    choices: [
      'Create Parking Lot',
      'Add Parking Lot',
      'Leave Parking Lot',
      'Check Parking Lot',
      'Close Application',
      'Egg',
      'Mango'
    ]
  }
]

const createParkingQuestion = [
  {
    name: 'createParking',
    message: 'How many parking slots do you want to create ?',
    type: 'input'
  }
]

const addParkingQuestion = [
  {
    name: 'registrationNumber',
    message: 'Insert registration number :',
    type: 'input'
  },
  {
    name: 'color',
    message: 'Vehicle colour :',
    type: 'input'
  }
]

const checkParkingQuestion = [
  {
    name: 'checkParking',
    message: 'Check Parking',
    type: 'list',
    choices: [
      'Check Slot Parking Lot',
      'Check Registration Number By Colour',
      'Check Slot Number By Colour',
      'Check Slot Number By Registration Number'
    ]
  }
]

const leaveParkingQuestion = [
  {
    name: 'leaveParking',
    message: 'Leave Parking Parking',
    type: 'list',
    choices: [
      'Leave Parking By Slot Number',
      'Leave Parking By Registration Number'
    ]
  }
]

const leaveParkingByIdQuestion = [
  {
    name: 'leaveById',
    message: 'Insert registration number :',
    type: 'input'
  }
]

const leaveParkingBySlotQuestion = [
  {
    name: 'leaveBySlot',
    message: 'Insert slot number :',
    type: 'input'
  }
]

const closeApplication = () => {
  ParkingLot({
    command: 'close'
  })
}

const runQuestions = () => {
  questionProcess(menuQuestion)
    .then((value) => {
      switch (value.menuParking) {
        case 'Create Parking Lot':
          questionProcess(createParkingQuestion)
            .then((value) => {
              ParkingLot({
                command: 'create',
                parkingSlot: value.createParking
              })
            })
            .catch(() => {
              closeApplication()
            })
          break
        case 'Add Parking Lot':
          questionProcess(addParkingQuestion)
            .then((value) => {
              ParkingLot({
                command: 'park',
                value: value
              })
            })
            .catch(() => {
              closeApplication()
            })
          break
        case 'Leave Parking Lot':
          questionProcess(leaveParkingQuestion)
            .then((value) => {
              switch (value.leaveParking) {
                case 'Leave Parking By Slot Number':
                  questionProcess(leaveParkingBySlotQuestion)
                    .then((value) => {
                      ParkingLot({
                        command: 'leaveBySlot',
                        value: value.leaveBySlot
                      })
                    })
                    .catch(() => {
                      closeApplication()
                    })
                  break
                case 'Leave Parking By Registration Number':
                  questionProcess(leaveParkingByIdQuestion)
                    .then((value) => {
                      ParkingLot({
                        command: 'leaveById',
                        value: value.leaveById
                      })
                    })
                    .catch(() => {
                      closeApplication()
                    })
                  break
                default:
                  closeApplication()
                  break
              }
            })
            .catch(() => {
              closeApplication()
            })
          break
        case 'Check Parking Lot':
            questionProcess(checkParkingQuestion)
              .then((value) => {
                switch (value.checkParking) {
                  case 'Check Slot Parking Lot':
                    ParkingLot({
                      command: 'status'
                    })
                    break
                  case 'Check Registration Number By Colour':
                    //
                    break
                  case 'Check Slot Number By Colour':
                    //
                    break
                  case 'Check Slot Number By Registration Number':
                    //
                    break
                  default:
                    closeApplication()
                    break
                }
              })
              .catch(() => {
                closeApplication()
              })
            break
        case 'Close Application':
          closeApplication()
          break
        default:
          closeApplication()
      }
    })
    .catch(() => {
      closeApplication()
    })
}

module.exports = {
  runQuestions
}
