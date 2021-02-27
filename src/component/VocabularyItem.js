import React from 'react'
import styled from 'styled-components/native'
import { Item, TextLarge, TextSmall, FlexWrap } from './Styled'

const VocabularyItem = ({item}) => {
  return (
    <Item>
      <FlexWrap>
        <TextLarge margin_right={10}>{item.word}</TextLarge>
        <TextSmall light margin_right={10}>{item.pos}</TextSmall>
      </FlexWrap>
      <FlexWrap>
        <TextSmall light margin_right={10}>an hour ago</TextSmall>
        <Level>{item.level}</Level>
      </FlexWrap>
    </Item>
  )
}

const Level = styled(TextSmall)`
  text-transform: capitalize
  background: #ddd
  width: 30px
  height: 100%
  text-align: center
  border-radius: 4px 
`

export default VocabularyItem;
