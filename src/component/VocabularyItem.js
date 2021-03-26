import React, {useState} from 'react'
import styled from 'styled-components/native'
import { Row, TextLarge, TextSmall, FlexWrap } from './Styled'
import {TouchableHighlight} from 'react-native'
import DefinitionView from '../component/DefinitionView'
import moment from 'moment'

const VocabularyItem = ({item}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Row as={TouchableHighlight} onPress={() => setOpen(!open)} underlayColor="#f5f5f5"><>
        <FlexWrap>
          <TextLarge margin_right={10}>{item.word}</TextLarge>
          <TextSmall light margin_right={10}>{item.pos}</TextSmall>
        </FlexWrap>
        <FlexWrap>
          {item.note && <TextSmall light margin_right={10}>{moment(item.note.updatedAt).fromNow()}</TextSmall>}
          <Level>{item.level}</Level>
        </FlexWrap>
      </></Row>
      {open && <DefinitionView vocabularyId={+item.id} pos={item.pos} />}
    </>
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
