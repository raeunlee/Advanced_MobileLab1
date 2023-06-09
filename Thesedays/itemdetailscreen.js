import { Text, View } from 'react-native';
import React from 'react';
import { styles } from './styles';

const ItemDetailScreen = ({ route }) => {
  const { itemId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.itemText}>Item ID: {itemId}</Text>
      {/* Add additional content or components for the item detail screen */}
    </View>
  );
};

export default ItemDetailScreen;
