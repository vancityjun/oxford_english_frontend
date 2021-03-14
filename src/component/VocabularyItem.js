import React from 'react'
import styled from 'styled-components/native'
import { Row, TextLarge, TextSmall, FlexWrap } from './Styled'
import {TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const VocabularyItem = ({item}) => {
  const {navigate} = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigate('Definitions', {vocabularyId: item.id})}>
      <Row>
        <FlexWrap>
          <TextLarge margin_right={10}>{item.word}</TextLarge>
          <TextSmall light margin_right={10}>{item.pos}</TextSmall>
        </FlexWrap>
        <FlexWrap>
          <TextSmall light margin_right={10}>an hour ago</TextSmall>
          <Level>{item.level}</Level>
        </FlexWrap>
      </Row>
    </TouchableOpacity>
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
