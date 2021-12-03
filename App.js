import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedFlatList from "./src/Animations/AnimatedFlatList";
import Navigation from "./src/Navigation";
const App = () => {
  return (
    <View style={styles.container}>
      <Navigation />
      {/* <AnimatedFlatList /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
