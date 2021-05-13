import React, {useState} from 'react'
import { View, Text, Pressable } from 'react-native'

const ToogleButtonWithArrow = ({title, active}) => {
  // const [active, setActive] = useState(false)
  const [down, setDown] = useState(false)
  const onPress = () => {
    if(active){
      setDown(!down)
    }
  }
  return (
    <Pressable>
      <Text>{title}</Text>
    </Pressable>
  );
};

export default ToogleButtonWithArrow;
