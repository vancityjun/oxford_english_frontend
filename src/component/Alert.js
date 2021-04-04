import React from 'react'
import styled from 'styled-components/native'
import { Modal, FlexWrap, TextSmall } from '../component/Styled'
import Button from '../component/Button'

const Alert = ({alertMessage, setAlertMessage, action}) => {
  return (
    <Wrap>
      <TextSmall>{alertMessage}</TextSmall>
      <FlexWrap>
        <Button 
          title='Cancel' 
          onPress={() => setAlertMessage('')} 
          background={false}
          width='50%'
        />
        <Button
          title='Ok'
          onPress={() => {
            action()
            setAlertMessage('')
          }}
          background={false}
          width='50%'
        />
      </FlexWrap>
    </Wrap>
  )
}

const Wrap = styled(Modal)`
  display: flex
  flex-flow: column
  padding: 10px
  width: 270px
  border-radius: 4px
  position: fixed
  top: 30%
`

export default Alert
