import React, { useContext } from 'react'
import { Row, FlexWrap } from './Styled'
import Button from '../Button'
import VocabularyContext from '../../context/vocabularyContext'

// not used
const ListHeader = () => {
  const {order, setOrder} = useContext(VocabularyContext)
  return (
    <Row>
      <Button title='name' onPress={() => setOrder()} />
      <FlexWrap>
        <Button title='last viewed' onPress={() => setOrder()} />
        <Button title='level' onPress={()=>setOrder() } />
      </FlexWrap>
    </Row>
  )
}

export default ListHeader
