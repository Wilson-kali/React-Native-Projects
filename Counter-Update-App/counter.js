import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Button title="Click Me" onPress={() => setCount(count + 1)}></Button>
      <Text style={styles.text}>You have Clicked {count} times</Text>
      <Button title="RESET" onPress={() => setCount(0)}></Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 26,
  },
});
export default App;
