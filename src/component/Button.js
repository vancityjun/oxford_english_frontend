import React from 'react'
import styled from 'styled-components/native'
import { globalVariable, ButtonTitle } from './Styled'

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
  warn,
  background = true,
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
      background={background}
    >
      <ButtonTitle fontSize={fontSize} active={active} warn={warn} >{title}</ButtonTitle>
    </Touchable>
  );
}

const Touchable = styled.TouchableOpacity`
  border: ${({outline}) => outline ? `1px solid ${globalVariable.dark_grey}` : 'none'}
  border-radius: 7px
  background: ${({active, background}) => {
    if(active){
      return globalVariable.primary_color
    }
    if (!background) {
      return 'transparent'
    }
    return globalVariable.white_grey
  }}
  text-align: center
  display: flex
  align-items: center
  justify-content: center
  min-width: ${({width}) => width || '30px'}
  min-height: ${({width, height}) => width ? height || '36px' : '30px'}
  padding: 5px 10px
  ${({disabled}) => disabled && 'opacity: .7'}
`

export default Button
