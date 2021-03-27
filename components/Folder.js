import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import colors from "../colors";
import TaskList from "./TaskList";

export default class Folder extends React.Component {
  state = {
    showFolderVisible: false,
  };

  toggleListModal() {
    this.setState({ showFolderVisible: !this.state.showFolderVisible });
  }
  render() {
    const folder = this.props.folder;

    const doneCount = folder.tasks.filter((task) => task.completed).length;
    const doCount = folder.tasks.length - doneCount;

    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showFolderVisible}
          onRequestClose={() => this.toggleListModal()}
        >
          <TaskList
            folder={folder}
            closeModal={() => this.toggleListModal()}
            updateFolder={this.props.updateFolder}
          />
        </Modal>
        <TouchableOpacity
          style={[styles.folderContainer, { backgroundColor: folder.color }]}
          onPress={() => this.toggleListModal()}
        >
          <Text style={styles.folderTitle} numberOfLines={1}>
            {folder.name}
          </Text>

          <View>
            <View style={styles.folderContent}>
              <Text style={styles.count}>{doCount}</Text>
              <Text style={styles.subtitle}>Do</Text>
            </View>
            <View style={styles.folderContent}>
              <Text style={styles.count}>{doneCount}</Text>
              <Text style={styles.subtitle}>Done</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  folderContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  folderTitle: {
    fontSize: 24,
    color: colors.black,
    marginBottom: 18,
  },
  folderContent: {
    alignItems: "center",
  },
  count: {
    fontSize: 28,
    color: colors.black,
  },
  subtitle: {
    fontSize: 17,
    color: colors.black,
  },
});
