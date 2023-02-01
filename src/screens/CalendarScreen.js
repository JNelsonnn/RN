import React from 'react';
import { NativeBaseProvider, VStack, Button } from 'native-base';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

function CalendarScreen({ navigation }) {
  return (
    <NativeBaseProvider>
      <Calendar
        // Initially visible month. Default = Date()
        current={'2021-02-02'}
        minDate={'2021-01-10'}
        maxDate={'2021-09-30'}
        hideExtraDays
        disableAllTouchEventsForDisabledDays
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => { console.log('selected day', day) }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => { console.log('selected day', day) }}
        markedDates={{
          '2021-05-16': { selected: true, marked: true, selectedColor: 'blue' },
          '2021-05-17': { marked: true },
          '2021-05-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
          '2021-05-19': { disabled: true, disableTouchEvent: true }
        }}
      />

    </NativeBaseProvider>
  );
}

export default CalendarScreen;
