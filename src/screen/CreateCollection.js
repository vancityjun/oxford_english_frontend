import React, { useContext, useState, useReducer } from 'react'
import { TextSmall, Page } from '../component/Styled'
import {VocabularyContext} from '../context/vocabularyContext'
import Calendar from '../component/Calendar'
import Button from '../component/Button'
import reducer from '../reducer/multipleSelectReducer'
import { getOverlappingDaysInIntervals, eachWeekOfInterval } from 'date-fns'

const CreateCollection = () => {
  const {vocabularies} = useContext(VocabularyContext)
  const today = new Date
  const [startDate, setStartDate]  = useState(today)
  const [endDate, setEndDate] = useState(new Date)
  const initialState = [
    { title: 'sun', active: true },
    { title: 'mon', active: true },
    { title: 'tue', active: true },
    { title: 'wed', active: true },
    { title: 'thu', active: true },
    { title: 'fri', active: true },
    { title: 'sat', active: true },
  ]
  
  const [state, dispatch] = useReducer(reducer, initialState)

  const getDays = () => {
    getOverlappingDaysInIntervals({ start: new Date(startDate), end: new Date(endDate) })
  }

  return (
    <Page>
      <TextSmall>total: {vocabularies.totalCount}</TextSmall>
      <TextSmall>from:</TextSmall>
      <Calendar
        value={startDate}
        onChange={(e, value) => setStartDate(value)}
        minimumDate={today}
      />
      <TextSmall>until:</TextSmall>
      <Calendar
        value={endDate} 
        onChange={(e, value) => setEndDate(value)}
        minimumDate={startDate}
      />
      {state.map((day, index) =>
        <Button
          onPress={() => dispatch({target: day})}
          key={index}
          active={day.active}
          outline={true}
          title={day.title}
          width={44}
          background={false}
          height='auto'
        />
      )}
      <Button
        title='next'
        onPress={()=>{}}
        active
      />
    </Page>
  )
}

export default CreateCollection
