import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
} from "react-native";

const App = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  function addTask() {
    if (task.trim()) {
      setTaskList([...taskList, { id: Date.now().toString(), title: task }]);
      setTask("");
    }
  }
  function deleteTask(id) {
    setTaskList(taskList.filter((item) => item.id !== id));
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to my To Do App </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a Task..."
          value={task}
          onChangeText={setTask}
        ></TextInput>
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

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
      ></FlatList>
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
  },
  input: {
    borderColor: "white",
    borderWidth: 2,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 8,
    color: "white",
  },
  addButton: {
    backgroundColor: "aqua",
    paddingHorizontal: 15,
    marginLeft: 10,
    marginRight: 14,
    borderRadius: 10,
    justifyContent: "center",
  },
  taskContainer: {
    backgroundColor: "white",
    marginBottom: 3,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLetf: 8,
    marginRight: 8,
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
