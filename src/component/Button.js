import React, {useEffect} from 'react'
import styled from 'styled-components/native'
import {globalVariable} from './Styled'

const Button = ({title, onPress, outline, active, fontSize, disabled, large}) => {
  if(!title){
    console.error('title is required!')
  }
  return (
    <Touchable 
      onPress={() => onPress()}
      activeOpacity={.7}
      outline={outline}
      active={active}
      disabled={disabled}
      large={large}
    >
      <Title fontSize={fontSize} active={active} >{title}</Title>
    </Touchable>
  );
}

const Touchable = styled.TouchableOpacity`
  border: ${({outline}) => outline ? `1px solid ${globalVariable.dark_grey}` : 'none'}
  padding: 2px 10px
  border-radius: 7px
  background: ${({active}) => active ? globalVariable.primary_color : 'transparent'}
  text-align: center
  display: flex
  align-items: center
  justify-content: center
  min-width: ${({large}) => large ? '170px': 'auto'}
  min-height: ${({large}) => large ? '38px': 'auto'}
`

const Title = styled.Text`
  color: ${({active}) => active ? '#fff' : globalVariable.dark_grey}
  font-size: ${({fontSize = 16}) => fontSize}px
`

export default Button
