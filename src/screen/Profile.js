import React, { useContext, useEffect } from 'react'
import { TouchableHighlight } from 'react-native'
import { Page, Row, TextSmall, FlexWrap } from '../component/Styled'
import { UserContext } from '../context/userContext'


const Profile = ({navigation}) => {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const logout = () => {
    setCurrentUser(null)
    navigation.goBack()
  }

  const menu = [
    {title: 'Logout', action: () => logout()},
    {title: 'Edit Profile', action: () => {debugger}}
  ]
  return (
    <Page>
      <FlexWrap>
        <TextSmall>{currentUser.fullName}</TextSmall>
      </FlexWrap>
      <FlexWrap>
        <TextSmall>{currentUser.email}</TextSmall>
      </FlexWrap>
      {menu.map(({title, action}) => 
        <Row as={TouchableHighlight} onPress={() => action()} underlayColor="#f5f5f5" key={title}>
          <TextSmall>{title}</TextSmall>
        </Row>
      )}
    </Page>
  );
};

export default Profile
