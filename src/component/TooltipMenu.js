import React, { useEffect } from 'react'
import { View, TouchableHighlight } from 'react-native'
import styled from 'styled-components/native'
import {Row, TextSmall} from './Styled'

const TooltipMenu = ({menu}) => {
  return (
    <Wrap>
      {menu.map(({title, onPress}) =>
        <Row as={TouchableHighlight} onPress={() => onPress()} underlayColor="#f5f5f5" key={title}>
          <TextSmall>{title}</TextSmall>
        </Row>
      )}
    </Wrap>
  )
}

const Wrap = styled.View`
  max-width: 140px
  shadow-opacity: 0.24
  shadow-radius: 7px
  shadow-color: #757575
  shadow-offset: 0px 2px
  position: absolute
  z-index: 1000
  background: #fff
`

export default TooltipMenu
