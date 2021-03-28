import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import colors from "./colors";
import { AntDesign } from "@expo/vector-icons";
import Folder from "./components/Folder";
import AddFolder from "./components/AddFolder";
import Fire from "./Fire";

export default class App extends React.Component {
  state = {
    addFolderVisible: false,
    folders: [],
    user: {},
    loading: true,
  };

  /* Line 28 - 46 was created by DesignIntoCode and changed by me to fit my project */

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("Uhh, there's something wrong :(");
      }

      firebase.getFolders((folders) => {
        this.setState({ folders, user }, () => {
          this.setState({ loading: false });
        });
      });

      this.setState({ user });
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleAddFolderModal() {
    this.setState({ addFolderVisible: !this.state.addFolderVisible });
  }

  renderFolder = (folder) => {
    return <Folder folder={folder} updateFolder={this.updateFolder} />;
  };

  addFolder = (folder) => {
    firebase.addFolder({
      name: folder.name,
      color: folder.color,
      tasks: [],
    });
  };

  updateFolder = (folder) => {
    firebase.updateFolder(folder);
  };

  render() {
    /* 
    ActivityIndicator provides a loading data animation 
    when the app is opened and has not been loaded 
    */

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.black} />
        </View>
      );
    }

    return (
      <View style={styles.container}>

        <Modal
          animationType="slide"
          visible={this.state.addFolderVisible}
          onRequestClose={() => this.toggleAddFolderModal()}
        >
          <AddFolder
            closeModal={() => this.toggleAddFolderModal()}
            addFolder={this.addFolder}
          />
        </Modal>

        <View style={styles.topWrap}>

          <Text style={styles.title}>Folders</Text>

          <TouchableOpacity
            style={styles.addFolder}
            onPress={() => this.toggleAddFolderModal()}
          >
            <AntDesign name="plus" size={34} color={colors.black} />
          </TouchableOpacity>

        </View>

        {/* 
        Folders are displayed as a FlatList 
        */}

        <View style={styles.folderList}>
          <FlatList
            data={this.state.folders}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => this.renderFolder(item)}
            keyboardShouldPersistTaps="always"
            numColumns={2}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  topWrap: {
    width: 345,
    padding: 5,
    paddingBottom: 10,
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 34,
    fontWeight: "500",
    color: colors.black,
  },
  addFolder: {
    alignSelf: "center",
    justifyContent: "center",
  },
  folderList: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 4,
  },
});
