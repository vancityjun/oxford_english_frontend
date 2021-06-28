import React, {useState} from 'react'
import styled from 'styled-components/native'
import { Row, TextLarge, TextSmall, FlexWrap } from './Styled'
import {TouchableHighlight} from 'react-native'
import DefinitionView from '../component/DefinitionView'
import moment from 'moment'

const VocabularyItem = ({item}) => {
  const {word, pos, note, celpip, level} = item
  console.log
  const [open, setOpen] = useState(false)

  return (
    <>
      <Row as={TouchableHighlight} onPress={() => setOpen(!open)} underlayColor="#f5f5f5"><>
        <FlexWrap>
          <TextLarge margin_right={10}>{word}</TextLarge>
          <TextSmall light margin_right={10}>{pos}</TextSmall>
        </FlexWrap>
        <FlexWrap>
          {note && <TextSmall light margin_right={10}>{moment(note.updatedAt).fromNow()}</TextSmall>}
          {celpip && <TextSmall margin_right={10}>Celpip</TextSmall>}
          <Level>{level}</Level>
        </FlexWrap>
      </></Row>
      {open && <DefinitionView vocabulary={item} />}
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
