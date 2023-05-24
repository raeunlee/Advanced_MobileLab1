import { StatusBar } from 'expo-status-bar';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFonts, PlayfairDisplay_500Medium_Italic } from '@expo-google-fonts/playfair-display';//npx expo install @expo-google-fonts/playfair-display expo-font
 

const App = () => {
  const data = Array.from({ length: 100 }, (_, index) => ({ id: index + 1, text: `Item ${index + 1}` }));
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  let [fontsLoaded] = useFonts({
    PlayfairDisplay_500Medium_Italic,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const renderHeader = () => {
    return (
      <View style={styles.header} onLayout={onLayoutRootView}>
        <Text style={[styles.logoText, { fontFamily: 'PlayfairDisplay_500Medium_Italic' }]}>thesedays</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 4</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
        ListFooterComponent={renderFooter}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <View style={styles.footerContainer}>{renderFooter()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  header: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoText: {
    fontSize: 40,
    fontFamily: 'PlayfairDisplay_500Medium_Italic',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  button: {
    padding: 10,
    backgroundColor: '#f194ff',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;