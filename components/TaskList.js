import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../colors";

export default class TaskList extends React.Component {
  state = {
    newTask: "",
  };

  toggleTaskCompleted = index => {
    let folder = this.props.folder
    folder.tasks[index].completed = !folder.tasks[index].completed

    this.props.updateFolder(folder);
    this.setState({ newTask: ""})
  };

  addTask = () => {
      let folder = this.props.folder
      folder.tasks.push({title: this.state.newTask, completed: false})

      this.props.updateFolder(folder);
      this.setState({newTask: ""})
  }

  renderTasks = (task, index) => {
    const folder = this.props.folder;

    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity onPress={() => this.toggleTaskCompleted(index)}>
          {/* If a task is completed, the box will filled, else it will be outlined */}
          <Ionicons
            name={task.completed ? "ios-square" : "ios-square-outline"}
            size={24}
            color={folder.color}
            style={{ width: 32 }}
          />
        </TouchableOpacity>

        {/* If the task is completed, it will be crossed out 
        and its colours will be set to the colours of its folder, 
        otherwise it will be black and uncrossed */}
        <Text
          style={[
            styles.task,
            {
              textDecorationLine: task.completed ? "line-through" : "none",
              color: task.completed ? folder.color : colors.black,
            },
          ]}
        >
          {task.title}
        </Text>
      </View>
    );
  };
  render() {
    const folder = this.props.folder;

    const taskCount = folder.tasks.length;
    const completedCount = folder.tasks.filter((task) => task.completed).length;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 64, right: 32, zIndex: 30 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="close" size={28} color={colors.black} />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: folder.color },
            ]}
          >
            <View>
              <Text style={styles.title}>{folder.name}</Text>
              <Text style={[styles.taskCount, { color: folder.color }]}>
                {completedCount} of {taskCount} completed
              </Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 3 }]}>
            <FlatList
              data={folder.tasks}
              renderItem={({ item, index }) => this.renderTasks(item, index)}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{
                paddingHorizontal: 32,
                paddingVertical: 64,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: folder.color }]}
              placeholder="Add a new task"
              onChangeText={text => this.setState({newTask: text})}
              value={this.state.newTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => this.addTask()}>
              <AntDesign name="plus" size={34} color={folder.color} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 34,
    fontWeight: "500",
    color: colors.black,
  },
  taskCount: {
    fontSize: 17,
    marginTop: 4,
    marginBottom: 16,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1.5,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  taskContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  task: {
    color: colors.black,
    fontSize: 17,
  },
});