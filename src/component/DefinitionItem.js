import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const DefinitionItem = ({item}) => {
  return (
    <View>
      <Text>{item.content}</Text>
    </View>
  );
};

export default DefinitionItem;
