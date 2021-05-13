import React, { useContext, useState } from 'react'
import { TextSmall, Page } from '../component/Styled'
import {VocabularyContext} from '../context/vocabularyContext'
import Calendar from '../component/Calendar'

const CreateCollection = () => {
  const {vocabularies} = useContext(VocabularyContext)
  const {startDate, setStartDate} = useState()
  const {endDate, setEndDate} = useState()

  return (
    <Page>
      <TextSmall>total: {vocabularies.totalCount}</TextSmall>
      <Calendar />
    </Page>
  );
};

export default CreateCollection;
