import React, { useState } from 'react';
import { View } from 'react-native';
import ButtonNavigation from './ButtonNavigation';
import MainScreen from './MainScreen';
import HotSns from './HotSns';
import Scrap from './Scrap';

const App = () => {
  const [selectedButton, setSelectedButton] = useState('button1');

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const renderScreen = () => {
    if (selectedButton === 'button1') {
      return <HotSns />;
    } else if (selectedButton === 'button2') {
      return <MainScreen />;
    } else if (selectedButton === 'button3') {
      return <Scrap />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
      <View style={{ paddingBottom: 10 }}>
        <ButtonNavigation selectedButton={selectedButton} onButtonPress={handleButtonPress} />
      </View>
    </View>
  );
};

export default App;
