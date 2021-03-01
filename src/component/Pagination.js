import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import {globalVariable, TextMedium, FlexWrap } from './Styled'
import styled from 'styled-components/native'


const Pagination = ({pages, currentPage, setCurrentPage}) => {
  const [showingPages, setShowingPages] = useState([])
  useEffect(() => {
    if(currentPage && pages){
      const startIndex = currentPage - 1
      const result = pages.slice(startIndex, startIndex + 5)
      setShowingPages(result)
    }
  },[currentPage, pages])

  return (
    <FlexWrap justifyContent="space-around">
      {showingPages.map((number) =>
        <TouchableOpacity 
          onPress={()=> setCurrentPage(number + 1)}
          key={number}
        >
          <PageNumber
            active={number + 1 === currentPage}
          >
            {number + 1}
          </PageNumber>
        </TouchableOpacity>
      )}
    </FlexWrap>
  )
}

const PageNumber = styled(TextMedium)`
  color: ${({active}) => active ? globalVariable.primary_color : globalVariable.medium_grey}
`

export default Pagination
