/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  Animated,
  SafeAreaView,
  Easing,
  Dimensions,
  Button,
} from 'react-native';

const Box = ({backgroundColor = 'green', scale = 1, translateY=0}) => {
  console.log(`Translate: ${translateY}`);
  const updatedStyle = {
    ...styles.animatedView,
    backgroundColor,
    transform: [{scale}, {translateY}],
  };

  return <Animated.View style={updatedStyle} />;
};

const usePulse = () => {
  const scale = useRef(new Animated.Value(1)).current;

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, {toValue: 1.2, duration: 1000, easing: Easing.ease,} ),
      Animated.timing(scale, {toValue: 0.8, duration: 500, easing: Easing.ease,})
    ]).start(() => pulse());
  };

  useEffect(() => {
    pulse();
  }, []);
  return scale;
};

const useSlide = (start = false) => {
  const {height, width} = Dimensions.get('window');
  const y = useRef(new Animated.Value(0)).current;
  const slide = () => {
    Animated.timing(y, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  useEffect(() => {
    if (start === true) {
      slide();
    }
  }, [start]);

  return y.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height/2.0 - 80],
  });
}

const App = () => {
  const [drop, setDrop] = useState(false);
  const y = useSlide(drop);
  return(
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Text>Hello World!</Text>
        <Button title="Drop" onPress={() => setDrop(!drop)}/>
        <>
          <Box scale={1} translateY={y} />
        </>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedView: {
    width: 100,
    height: 100,
  }
});

export default App;
