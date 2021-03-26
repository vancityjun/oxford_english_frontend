import React, { useContext, useEffect } from 'react'
import { TouchableHighlight } from 'react-native'
import { Page, Row, TextSmall, FlexWrap } from '../component/Styled'
import LogoutMutation from '../../graphql/mutation/logout.gql'
import { UserContext } from '../context/userContext'
import { useMutation } from '@apollo/client'


const Profile = ({navigation}) => {
  const [logout, { data, error }] = useMutation(LogoutMutation)
  const {currentUser, setCurrentUser} = useContext(UserContext)
  useEffect(()=>{
    if(!error && data) {
      setCurrentUser(null)
      navigation.goBack()
    }
  },[data])

  return (
    <Page>
      <FlexWrap>
        <TextSmall>{currentUser.email}</TextSmall>
      </FlexWrap>
      <Row as={TouchableHighlight} onPress={() => logout()} underlayColor="#f5f5f5">
        <TextSmall>Logout</TextSmall>
      </Row>
    </Page>
  );
};

export default Profile
