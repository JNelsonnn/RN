import { hoursToMinutes, eachDayOfInterval, eachMinuteOfInterval, areIntervalsOverlapping, addMinutes, parseISO, addHours } from 'date-fns'

const jsDayToDayName = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday'
}

function slotFn(slots, bookings, duration) {
  let result = {}
  const truthy = (element) => element === true

  for (const slot of slots) {
    let overlappings = []
    for (const bookingIndex of Object.keys(bookings)) {
      let isOverlapping = areIntervalsOverlapping(
        { start: slot, end: addMinutes(slot, duration) },
        { start: parseISO(bookings[bookingIndex]["start_time"]), end: parseISO(bookings[bookingIndex]["end_time"]) }
      )
      overlappings.push(isOverlapping)
    }

    result[slot.toISOString()] = { available: !overlappings.some(truthy) }
  }

  return result
}

function timeToMinutes(time) {
  const [hour, minutes] = time.split(":")
  return hoursToMinutes(parseInt(hour)) + parseInt(minutes)
}

function AvailabilityCalculator(start, end, duration, bookings, availability) {
  const dates = eachDayOfInterval({ start: parseISO(start), end: parseISO(end) })
  let result = {}

  dates.forEach(function (date) {
    let dayAvailability = availability[jsDayToDayName[date.getDay()]]
    if (dayAvailability["available"]) {
      let slots = eachMinuteOfInterval({
        start: addMinutes(date, timeToMinutes(dayAvailability["start_time"])),
        end: addMinutes(date, timeToMinutes(dayAvailability["end_time"])),
      }, { step: 30 })
      result[date.toISOString()] = { "slots": slotFn(slots.slice(0, -1), bookings, duration) }
    }
  })

  return result;
}
module.exports = AvailabilityCalculator;
