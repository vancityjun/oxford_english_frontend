import styled from 'styled-components/native'

export const globalVariable = {
  primary_color: '#FFC915',
  dark_grey: '#3E3E3E',
  medium_grey: '#676767',
  light_grey: '#DDDDDD',
  font_small: '16px',
  font_medium: '18px',
  font_large: '20px'
}

const {
  primary_color,
  dark_grey,
  medium_grey,
  light_grey,
  font_small,
  font_medium,
  font_large
} = globalVariable

export const FlexWrap = styled.View`
  display: flex
  flex-flow: row-wrap
  align-items: baseline
  justify-content: ${({justifyContent}) => justifyContent || 'flex-start'}
` 

export const Item = styled(FlexWrap)`
  justify-content: space-between
  padding: 15px 20px
  border-bottom-width: 1px
  border-bottom-color: ${light_grey}
  align-items: center
`
export const TextMedium = styled.Text`
  font-size: ${font_medium}
  color: ${({light}) => light ? medium_grey : dark_grey}
  margin-right: ${({margin_right}) => margin_right || 0}px
`
export const TextLarge = styled(TextMedium)`
  font-size: ${font_large}
`
export const TextSmall = styled(TextMedium)`
  font-size: ${font_small}
`

export const Button = styled.TouchableOpacity`
  border: 1px solid ${dark_grey}
  padding: 2px 10px
  border-radius: 7px
  background: ${({active}) => active ? primary_color : 'transparent'}
`
