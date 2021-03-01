import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
// not sure if I use it yet
const Dropdown = ({list, setValue}) => {
  return (
    <View>
      {list.map((item, index) =>
        <Item title={item.title} setValue={setValue} key={index} />
      )}
    </View>
  )
}

const Item = ({title, setValue}) => {
  return (
    <TouchableOpacity onPress={()=> setValue()}>
      <Text>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Dropdown;
