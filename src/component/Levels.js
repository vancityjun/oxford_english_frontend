import React, {useReducer, useEffect, useContext} from 'react'
import styled from 'styled-components/native'
import { FlexWrap, globalVariable, Button, TextMedium } from './Styled'
import {reducer, initialState} from '../reducer/levelReducer'
import {VocabularyContext} from '../context/vocabularyContext'

const Levels = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {setLevels} = useContext(VocabularyContext)

  useEffect(() => {
    const selectedLevels = state.filter(({active}) => active).map(({title}) => title)
    setLevels(selectedLevels)
  },[state])

  return (
    <LevelsContainer justifyContent="space-between">
      <Button onPress={() => setLevels([])} activeOpacity={.7}>
        <TextMedium>all</TextMedium>
      </Button>
      {state.map((level, index) =>
        <Button
          onPress={() => dispatch({target: level})}
          key={index}
          activeOpacity={.7}
        >
          <TextMedium>{level.title}</TextMedium>
        </Button>
      )}
    </LevelsContainer>
  )
}

const LevelsContainer = styled(FlexWrap)`
  padding: 10px 20px
  border-bottom-width: 1px
  border-bottom-color: ${globalVariable.light_grey}
`

export default Levels
