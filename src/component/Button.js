import React, {useEffect} from 'react'
import styled from 'styled-components/native'
import {globalVariable} from './Styled'

const Button = ({
  title,
  onPress,
  outline,
  active,
  fontSize,
  disabled,
  large,
  width,
  height,
  onBlur = () => {}
}) => {
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
      width={width}
      height={height}
      onBlur={() => onBlur()}
    >
      <Title fontSize={fontSize} active={active} >{title}</Title>
    </Touchable>
  );
}

const Touchable = styled.TouchableOpacity`
  border: ${({outline}) => outline ? `1px solid ${globalVariable.dark_grey}` : 'none'}
  border-radius: 7px
  background: ${({active}) => active ? globalVariable.primary_color : globalVariable.white_grey}
  text-align: center
  display: flex
  align-items: center
  justify-content: center
  min-width: ${({width}) => width || 30}px
  min-height: ${({width}) => width? 36 :  30}px
  padding: 5px 10px
`

const Title = styled.Text`
  color: ${({active}) => active ? '#fff' : globalVariable.dark_grey}
  font-size: ${({fontSize = 16}) => fontSize}px
`

export default Button
