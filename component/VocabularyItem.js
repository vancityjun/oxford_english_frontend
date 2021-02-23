import React, {useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VocabularyItem = ({item}) => {
  return (
    <View>
      <Text>{item.word}</Text>
    </View>
  );
};

export default VocabularyItem;
