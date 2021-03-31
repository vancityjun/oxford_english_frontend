import React, { useContext } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styled from 'styled-components/native'
import {ModalControlContext} from '../context/ModalControlContext'
import {Modal, FlexWrap} from '../component/Styled'

const Alert = ({alertMessage, setAlertMessage, action}) => {
  return (
    <Wrap>
      <Text>{alertMessage}</Text>
      <FlexWrap>
        <TouchableHighlight onPress={() => setAlertMessage('')}>
          <Text>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => {
            action()
            setAlertMessage('')
          }}
        >
          <Text>Ok</Text>
        </TouchableHighlight>
      </FlexWrap>
    </Wrap>
  )
}

const Wrap = styled(Modal)`
  display: flex
  flex-flow: column
  padding: 10px
  position: relative
  width: 270px
  border-radius: 4px
  position: absolute
  top: 30%
`

export default Alert
