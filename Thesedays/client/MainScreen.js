import { StatusBar, Linking } from 'expo-status-bar';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import { useFonts, PlayfairDisplay_500Medium_Italic } from '@expo-google-fonts/playfair-display';
import { styles } from './styles';
import ButtonNavigation from './ButtonNavigation';

const MainScreen = () => {
  const data = Array.from({ length: 20 }, (_, index) => ({ id: index + 1, text: `Item ${index + 1}` }));
  const [refreshing, setRefreshing] = useState(false);
  const [selectedButton, setSelectedButton] = useState('button1');
  const [isButton2Highlighted, setIsButton2Highlighted] = useState(false);
  const [content, setContent] = useState([]);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
      // Fetch data from localhost:3000/api
      fetchData();
    }, 2000);
  }, []);
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_500Medium_Italic,
  });

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = () => {
    fetch('http://localhost:3000/api')
      .then(res => res.json())
      .then(data => {
        setContent([data]);
        console.log(data); // 데이터 확인을 위한 콘솔 로그 출력
      })
      .catch(error => console.error(error));
  };


  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={[styles.logoText, { fontFamily: 'PlayfairDisplay_500Medium_Italic' }]}>thesedays</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item.id)}>
        <Text style={styles.itemText}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  const handleItemPress = (itemId) => {
    // Handle item press here
    console.log('Item pressed:', itemId);

    // Example: Open a link based on the item ID
    const link = getItemLinkById(itemId); // Implement a function to get the corresponding link for the item ID
    if (link) {
      Linking.openURL(link);
    }
  };

  const handleButtonPress = (button) => {
    // Handle button press here
    console.log('Button pressed:', button);
    setSelectedButton(button);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <StatusBar style="auto" />
        {renderHeader()}
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={<ButtonNavigation selectedButton={selectedButton} onButtonPress={handleButtonPress} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

export default MainScreen;