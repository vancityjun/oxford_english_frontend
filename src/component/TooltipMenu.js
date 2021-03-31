import React, { useContext } from 'react'
import { TouchableHighlight } from 'react-native'
import styled from 'styled-components/native'
import {Row, TextSmall, Modal} from './Styled'

const TooltipMenu = ({menu}) => {
  return (
    <Wrap>
      {menu.map(({title, onPress}) =>
        <Row as={TouchableHighlight}
          onPressOut={() => onPress()}
          underlayColor="#f5f5f5"
          key={title}
        >
          <TextSmall>{title}</TextSmall>
        </Row>
      )}
    </Wrap>
  )
}

const Wrap = styled(Modal)`
  max-width: 140px
  left: 30px
`

export default TooltipMenu
