import React, { useState, useEffect } from 'react'
import { Pressable} from 'react-native'
import {TextSmall, TextMedium, globalStyles} from './Styled'
import styled from 'styled-components/native'
import moment from 'moment'

const Calendar = ({callBack}) => {
  const [date, setDate] = useState(moment())
  const [startDate, setStartDate] = useState(moment().subtract(5, 'day'))
  const [endDate, setEndDate] = useState(moment().add(3, 'day'))

  const resetDate = () => {
    setDate(moment())
  }

  const changeMonth = month => {
    date.month(month)
    setDate(date)
  }

  const changeDate = date => {
    let _startDate, _endDate

    if (startDate === null || date.isBefore(startDate, 'day') || ! startDate.isSame(endDate, 'day')) {
      _startDate = moment(date);
      _endDate = moment(date);
    } else if (date.isSame(startDate, 'day') && date.isSame(endDate, 'day')) {
      _startDate = null;
      _endDate = null;
    } else if (date.isAfter(startDate, 'day')) {
      _endDate = moment(date);
    }

    setStartDate(_startDate)
    setEndDate(_endDate)
  }

  return (
    <CalendarView>
      {date && <Heading date={date} changeMonth={month => changeMonth(month)} resetDate={() => resetDate()} />}
      <Days onPress={date => changeDate(date)} date={date} startDate={startDate} endDate={endDate} />
    </CalendarView>
  )
}

const Heading = ({date, changeMonth, resetDate}) => (
  <CalendarNav>
    <Pressable onPress={() => changeMonth(date.month() - 1)}>
      <TextSmall>&#8249;</TextSmall>
    </Pressable>
    <Pressable onPress={() => resetDate()}>
      <TextMedium>{date.format('MMMM')}</TextMedium>
      <TextSmall>{date.format('YYYY')}</TextSmall>
    </Pressable>
    <Pressable onPress={() => changeMonth(date.month() + 1)}>
      <TextSmall>&#8250;</TextSmall>
    </Pressable>
  </CalendarNav>
)

// const Day = ({currentDate, date, startDate, endDate, onPress}) => {
//   return (
//     <Pressable
//       title={date.date()}
//       onPress={() => onPress(date)}
//       currentDate={date}
//       active={moment().isSame(date, 'day')}
//       start={date.isSame(startDate, 'day')}
//       between={date.isBetween(startDate, endDate, 'day')}
//       end={date.isSame(endDate, 'day')}
//       muted={!date.isSame(currentDate, 'month')}
//     >
//       <TextSmall>
//         {date.date()}
//       </TextSmall>
//     </Pressable>
//   )
// }

const Days = ({date, startDate, endDate, onPress}) => {
  const thisDate = moment(date)
  const daysInMonth = moment(date).daysInMonth();
  const firstDayDate = moment(date).startOf('month');
  const previousMonth = moment(date).subtract(1, 'month');
  const previousMonthDays = previousMonth.daysInMonth();
  const nextsMonth = moment(date).add(1, 'month');
  let days = [];
  let labels = [];

  for (let i = 1; i <= 7; i++) {
    labels.push(<Label>{moment().day(i).format('ddd')}</Label>)
  }

  for (let i = firstDayDate.day(); i > 1; i--) {
    previousMonth.date(previousMonthDays - i + 2)
    let _date = moment(previousMonth)

    days.push(
      <Day
        title={_date.date()}
        key={_date.format('DD MM YYYY')}
        disabled
      />
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    thisDate.date(i)
    let _date = moment(thisDate)

    days.push(
      <Day 
        title={_date.date()}
        key={_date.format('DD MM YYYY')} 
        onPress={() => onPress(_date)}
        start={_date.isSame(startDate, 'day')}
        between={_date.isBetween(startDate, endDate, 'day')}
        end={_date.isSame(endDate, 'day')}
      />
    )
  }

  const daysCount = days.length;
  for (let i = 1; i <= (42 - daysCount); i++) {
    nextsMonth.date(i)
    let _date = moment(nextsMonth)
    days.push(
      <Day
        key={_date.format('DD MM YYYY')}
        onPress={() => onPress(_date)}
        start={_date.isSame(startDate, 'day')}
        between={_date.isBetween(startDate, endDate, 'day')}
        end={_date.isSame(endDate, 'day')}
        muted
      />
    );
  }

  return (
    <CalendarDays>
      {labels.concat()}
      {days.concat()}
    </CalendarDays>
  );
};

const CalendarView = styled.View`
  position: absolute;
  padding: 15px;
  border-radius: 4px;
  overflow: hidden;
`

const CalendarNav = styled.View`
  margin: -15px -15px 15px;
  padding: 0 15px;
  color: #fff;
  height: 70px;
  position: relative;
`
const CalendarDays = styled.View``
const Label = styled.Text``
const Day = styled.Button`
  ${({start, end}) => (start || end) && 
    `border: 1px solid #333`
  }
  width: 100px
  display: none
  color: #000
  border-radius: 0px;
  position: fixed
`

export default Calendar
