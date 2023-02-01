const calc = require('../src/functions/AvailabilityCalculator');

const availability = {
  monday: { available: true, start_time: "10:00", end_time: "13:00" },
  tuesday: { available: false, start_time: "9:00", end_time: "17:00" },
  wednesday: { available: true, start_time: "12:00", end_time: "13:00" },
  thursday: { available: false, start_time: "9:00", end_time: "17:00" },
  friday: { available: false, start_time: "9:00", end_time: "17:00" },
  saturday: { available: false, start_time: "9:00", end_time: "17:00" },
  sunday: { available: false, start_time: "9:00", end_time: "17:00" },
}
const bookings = {
  '2021-10-04T10:00:00.000Z': {
    duration: 30,
    start_time: '2021-10-04T10:00:00.000Z',
    end_time: '2021-10-04T10:30:00.000Z'
  },
  '2021-10-04T11:30:00.000Z': {
    duration: 60,
    start_time: '2021-10-04T11:30:00.000Z',
    end_time: '2021-10-04T12:30:00.000Z'
  }
}

const available30MinSlots = {
  '2021-10-03T23:00:00.000Z': {
    slots: {
      '2021-10-04T09:00:00.000Z': {
        available: true
      },
      '2021-10-04T09:30:00.000Z': {
        available: true
      },
      '2021-10-04T10:00:00.000Z': {
        available: false
      },
      '2021-10-04T10:30:00.000Z': {
        available: true
      },
      '2021-10-04T11:00:00.000Z': {
        available: true
      },
      '2021-10-04T11:30:00.000Z': {
        available: false
      }
    }
  },
  '2021-10-05T23:00:00.000Z': {
    slots: {
      '2021-10-06T11:00:00.000Z': {
        available: true
      },
      '2021-10-06T11:30:00.000Z': {
        available: true
      }
    }
  }
}

const available60MinSlots = {
  '2021-10-03T23:00:00.000Z': {
    slots: {
      '2021-10-04T09:00:00.000Z': {
        available: true
      },
      '2021-10-04T09:30:00.000Z': {
        available: false
      },
      '2021-10-04T10:00:00.000Z': {
        available: false
      },
      '2021-10-04T10:30:00.000Z': {
        available: true
      },
      '2021-10-04T11:00:00.000Z': {
        available: false
      },
      '2021-10-04T11:30:00.000Z': {
        available: false
      }
    }
  },
  '2021-10-05T23:00:00.000Z': {
    slots: {
      '2021-10-06T11:00:00.000Z': {
        available: true
      },
      '2021-10-06T11:30:00.000Z': {
        available: true
      }
    }
  }
}

test('generates 30 min availability slots', () => {
  const start = '2021-10-04T00:00:00.000Z'
  const end = '2021-10-06T00:00:00.000Z'
  const mins = 30
  expect(calc(start, end, mins, bookings, availability)).toEqual(available30MinSlots);
});

test('generates 60 min availability slots', () => {
  const start = '2021-10-04T00:00:00.000Z'
  const end = '2021-10-06T00:00:00.000Z'
  const mins = 60
  expect(calc(start, end, mins, bookings, availability)).toEqual(available60MinSlots);
});
