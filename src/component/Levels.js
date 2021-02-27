import React, {useReducer, useEffect} from 'react'
import styled from 'styled-components/native'
import { FlexWrap, globalVariable, Touchable, TextMedium } from './Styled'
import {reducer, initialState} from '../reducer/levelReducer'

const Levels = ({setLevels}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    const selectedLevels = state.filter(({active}) => active).map(({title}) => title)
    setLevels(selectedLevels)
  },[state])

  return (
    <LevelsContainer>
      <Touchable onPress={() => setLevels([])} >
        <TextMedium>all</TextMedium>
      </Touchable>
      {state.map((level, index) =>
        <Touchable
          onPress={() => dispatch({target: level})}
          key={index}
        >
          <TextMedium>{level.title}</TextMedium>
        </Touchable>
      )}
    </LevelsContainer>
  )
}

const LevelsContainer = styled(FlexWrap)`
  padding: 10px 20px
  justify-content: space-between
  border-bottom-width: 1px
  border-bottom-color: ${globalVariable.light_grey}
`

export default Levels
