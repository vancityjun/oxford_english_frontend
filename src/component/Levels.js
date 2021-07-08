import React, {useReducer, useEffect, useContext} from 'react'
import styled from 'styled-components/native'
import { FlexWrap, globalVariable } from './Styled'
import reducer from '../reducer/multipleSelectReducer'
import {VocabularyContext} from '../context/vocabularyContext'
import Button from '../component/Button'

const Levels = () => {
  const initialState = [
    { title: 'a1', active: false },
    { title: 'a2', active: false },
    { title: 'b1', active: false },
    { title: 'b2', active: false },
    { title: 'c1', active: false }
  ]
  
  const [state, dispatch] = useReducer(reducer, initialState)
  const {levels, setLevels} = useContext(VocabularyContext)

  useEffect(() => {
    const selectedLevels = state.filter(({active}) => active).map(({title}) => title)
    setLevels(selectedLevels)
  },[state])

  return (
    <LevelsContainer justifyContent="space-between">
      <Button 
        onPress={() => dispatch({active: levels.length <= 4})}
        outline={true} title='all'
        active={levels.length > 4}
        width={44}
        background={false}
        height='auto'
      />
      {state.map((level, index) =>
        <Button
          onPress={() => dispatch({target: level})}
          key={index}
          active={level.active}
          outline={true}
          title={level.title}
          width={44}
          background={false}
          height='auto'
        />
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
