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
      'Show Parking Lot',
      'Close Application'
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

const showParkingQuestion = [
  {
    name: 'showParking',
    message: 'Show Parking',
    type: 'list',
    choices: [
      'Show Slot Parking Lot',
      'Show Slot Parking By Colour',
      'Show Slot Parking By Registration Number',
      'Show Slot Parking By Slot Number'
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

const showParkingByColorQuestion = [
  {
    name: 'showByColor',
    message: 'Insert color you want to show :',
    type: 'input'
  }
]

const showParkingByIdQuestion = [
  {
    name: 'showById',
    message: 'Insert registration number you want to show :',
    type: 'input'
  }
]

const showParkingBySlotQuestion = [
  {
    name: 'showBySlot',
    message: 'Insert slot number you want to show :',
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
        case 'Show Parking Lot':
            questionProcess(showParkingQuestion)
              .then((value) => {
                switch (value.showParking) {
                  case 'Show Slot Parking Lot':
                    ParkingLot({
                      command: 'show'
                    })
                    break
                  case 'Show Slot Parking By Colour':
                      questionProcess(showParkingByColorQuestion)
                        .then((value) => {
                          ParkingLot({
                            command: 'showByColor',
                            value: value.showByColor
                          })
                        })
                        .catch(() => {
                          closeApplication()
                        })
                    break
                  case 'Show Slot Parking By Registration Number':
                    questionProcess(showParkingByIdQuestion)
                      .then((value) => {
                        ParkingLot({
                          command: 'showById',
                          value: value.showById
                        })
                      })
                      .catch(() => {
                        closeApplication()
                      })
                    break
                  case 'Show Slot Parking By Slot Number':
                    questionProcess(showParkingBySlotQuestion)
                      .then((value) => {
                        ParkingLot({
                          command: 'showBySlot',
                          value: value.showBySlot
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
