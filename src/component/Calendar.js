import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import {isDesktop} from '../helper/DeviceHelper'
import { format } from 'date-fns'

const Calendar = ({value, onChange, minimumDate, maximumDate}) => {
  const inputDateFormat = value => {
    if(!value){
      return
    }
    return `${format(value, 'yyyy-MM-dd')}`
  }

  if(isDesktop) {
    return (
      <input type="date"
       value={inputDateFormat(value)}
       min={inputDateFormat(minimumDate)}
       max={inputDateFormat(maximumDate)}
       onChange={onChange}
       />
    )
  } else {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={value}
        mode='date'
        is24Hour={true}
        display="default"
        onChange={onChange}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    )
  }
}

export default Calendar
