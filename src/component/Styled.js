import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

export const globalVariable = {
  primary_color: '#881111',
  dark_grey: '#3E3E3E',
  medium_grey: '#676767',
  light_grey: '#DDDDDD',
  white_grey: '#f5f5f5',
  warn_red: '#e81717',
  font_small: '16px',
  font_medium: '18px',
  font_large: '20px'
}

const {
  primary_color,
  dark_grey,
  medium_grey,
  light_grey,
  warn_red,
  font_small,
  font_medium,
  font_large
} = globalVariable

export const Page = styled.View`
  background: #fff
  height: 100%
`

export const FlexWrap = styled.View`
  display: flex
  flex-flow: row-wrap
  align-items: baseline
  justify-content: ${({justifyContent}) => justifyContent || 'flex-start'}
`

export const FlexColumn = styled(Page)`
  display: flex
  flex-direction: column
  align-items: center
`

export const Row = styled(FlexWrap)`
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
  line-height: 26px
`
export const TextLarge = styled(TextMedium)`
  font-size: ${font_large}
  line-height: 30px
`
export const TextSmall = styled(TextMedium)`
  font-size: ${font_small}
  line-height: 22px
`

export const TextInputTitle = styled(TextSmall)`
  color: ${({focus}) => focus ? primary_color : medium_grey}
`

export const ButtonTitle = styled(TextSmall)`
  color: ${({active, warn}) => {
    if(active) {
      return '#fff'
    }
    if(warn) {
      return warn_red
    }
    return dark_grey
  }}
  font-size: ${({fontSize = 16}) => fontSize}px
`

export const Button = styled.TouchableOpacity`
  border: ${({outline}) => outline ? `1px solid ${dark_grey}` : 'none'}
  padding: 2px 10px
  border-radius: 7px
  background: ${({active}) => active ? primary_color : 'transparent'}
`

export const Inner = styled.View`
  width: ${({width}) => width || '100%'}
  margin-bottom: 20px
`
export const ModalStyle = styled.View`
  shadow-opacity: 0.24
  shadow-radius: 7px
  shadow-color: #757575
  shadow-offset: 0px 2px
  position: absolute
  z-index: 1000
  background: #fff
`

export const TextInput = styled.TextInput`
  border-bottom-width: 1px
  border-bottom-color: ${({focus}) => focus ? primary_color : dark_grey}
  font-size: 16px
  background: #fff
  ${({isDesktop}) => isDesktop && 'outline-width: 0'}
`

export const globalStyles = StyleSheet.create({
  content: {
    marginBottom: 10,
    lineHeight: 22
  }
})
