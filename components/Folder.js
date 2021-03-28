import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import colors from "../colors";
import TaskList from "./TaskList";
import { FontAwesome5 } from '@expo/vector-icons';

export default class Folder extends React.Component {
  state = {
    showFolderVisible: false,
  };

  toggleListModal() {
    this.setState({ showFolderVisible: !this.state.showFolderVisible });
  }

  /* 

  I am not able to figure out the issue with my deleteFolder
  function at the moment, I will do more research and
  keep trying.

  deleteFolder = folder => {
  let folderId = this.props.folderId
  folderId.splice(folder, 1)
  } 
  */

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
          /*
          onLongPress={() => this.deleteFolder(folder)}
          */
        >
          <Text style={styles.folderTitle} numberOfLines={1}>
            {folder.name}
          </Text>

          <View>
            <View style={styles.folderContent}>
            <FontAwesome5 name="times-circle" size={24} color="black" />
              <Text style={styles.count}>{doCount}</Text>
            </View>
            <View style={styles.folderContent}>
            <FontAwesome5 name="check-circle" size={24} color="black" />
              <Text style={styles.count}>{doneCount}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  folderContainer: {
    paddingVertical: 13,
    paddingHorizontal: 13,
    borderRadius: 30,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 173,
    height: 173
  },
  folderTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 18,
  },
  folderContent: {
    width: 90,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
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
