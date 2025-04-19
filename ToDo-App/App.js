import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  SafeAreaView,
  LayoutAnimation,
  UIManager,
  Platform,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem("taskList");
      if (storedTasks) {
        setTaskList(JSON.parse(storedTasks));
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const showToast = (msg) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  };

  const addTask = () => {
    if (task.trim()) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setTaskList([...taskList, { id: Date.now().toString(), title: task }]);
      showToast("Task Added");
      setTask("");
    }
  };

  const deleteTask = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTaskList(taskList.filter((item) => item.id !== id));
    showToast("Task Deleted");
  };

  const clearAllTasks = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTaskList([]);
    showToast("All Tasks Cleared");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to my To Do App</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a Task..."
          placeholderTextColor="#ccc"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={clearAllTasks}>
        <Text style={{ color: "white", textAlign: "center" }}>Clear All</Text>
      </TouchableOpacity>

      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.title}</Text>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.ButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
    color: "aqua",
    fontWeight: "bold",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 25,
    marginHorizontal: 10,
  },
  input: {
    borderColor: "white",
    borderWidth: 2,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    color: "white",
  },
  addButton: {
    backgroundColor: "aqua",
    paddingHorizontal: 15,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  clearButton: {
    backgroundColor: "darkred",
    marginHorizontal: 12,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  taskContainer: {
    backgroundColor: "white",
    marginBottom: 3,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: "red",
    paddingVertical: 9,
    margin: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  taskText: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 7,
  },
  ButtonText: {
    color: "white",
  },
});

export default App;
