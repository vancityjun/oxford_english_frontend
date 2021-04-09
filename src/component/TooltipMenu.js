import React from 'react'
import { TouchableHighlight } from 'react-native'
import styled from 'styled-components/native'
import { Row, ModalStyle, ButtonTitle } from './Styled'

const TooltipMenu = ({menu}) => {
  return (
    <Wrap>
      {menu.map(({title, onPress, warn}) =>
        <Row as={TouchableHighlight}
          onPress={() => onPress()}
          underlayColor="#f5f5f5"
          key={title}
        >
          <ButtonTitle warn={warn}>{title}</ButtonTitle>
        </Row>
      )}
    </Wrap>
  )
}

const Wrap = styled(ModalStyle)`
  width: 140px
  left: 30px
`

export default TooltipMenu
