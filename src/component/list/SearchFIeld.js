import React, { useContext, useState } from 'react'
import styled from 'styled-components/native'
import Button from '../Button'
import {FlexWrap, globalVariable} from '../Styled'
import { isDesktop } from '../../helper/DeviceHelper'
import {VocabularyContext} from '../../context/vocabularyContext'


const SearchField = () => {
  const {keyword, setKeyword} = useContext(VocabularyContext)
  const [searchValue, SetSearchValue] = useState(keyword)
  return (
    <Wrap>
      <TextInput
        onChangeText={value => SetSearchValue(value)}
        value={searchValue}
      />
      <Button
        onPress={() => setKeyword(searchValue)}
        title='Search'
        active={true}
        height='auto'
      />
    </Wrap>
  )
}

const TextInput = styled.TextInput`
  font-size: 16px
  background: #fff
  width: 100%
  height: 100%
  border-radius: 7px
  border: 1px solid ${globalVariable.dark_grey}
  padding: 0 7px
  ${isDesktop && 'outline-width: 0'}
`

const Wrap = styled(FlexWrap)`
  flex-flow: row
  justify-content: space-between
  align-items: center
  width: 100%
  padding-right: 70px
`


export default SearchField
