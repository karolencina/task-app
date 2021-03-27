import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  ActivityIndicator
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
  "";

  renderFolder = (folder) => {
    return <Folder folder={folder} updateFolder={this.updateFolder} />;
  };

  addFolder = folder => {
      firebase.addFolder({
        name: folder.name,
        color: folder.color,
        tasks: []
      })
  };

  updateFolder = folder => {
    this.setState({
      folders: this.state.folders.map((item) => {
        return item.id === folder.id ? folder : item;
      }),
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
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
        <View>
          <Text>User: {this.state.user.uid}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>Hi</Text>
          <View style={styles.divider}></View>
        </View>

        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addFolder}
            onPress={() => this.toggleAddFolderModal()}
          >
            <AntDesign name="plus" size={24} color={colors.black} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.folders}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderFolder(item)}
            keyboardShouldPersistTaps="always"
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
  },
  divider: {
    backgroundColor: colors.black,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "500",
    color: colors.black,
    paddingHorizontal: 64,
  },
  addFolder: {
    alignSelf: "center",
  },
});
