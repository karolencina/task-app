import React from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  TouchableHighlightBase,
} from "react-native";
import colors from "../colors";
import { AntDesign } from "@expo/vector-icons";
import tempData from "../tempData";

export default class AddFolder extends React.Component {
  customColors = [
    "#48D1B9",
    "#7582F4",
    "#AE96F4",
    "#EC9CDF",
    "#FF9F81",
    "#F0CB6A",
  ];

  state = {
    name: "",
    color: this.customColors[0],
  };

  createFolder = () => {
    const { name, color } = this.state;

    const folder = { name, color };

    this.props.addFolder(folder);

    this.setState({ name: "" });
    this.props.closeModal();
  };

  renderColors() {
    return this.customColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.customColors, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add a new Folder</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={28} color={colors.black} />
        </TouchableOpacity>

        <View style={{ alignSelf: "center", marginHorizontal: 15 }}>
          <TextInput
            style={styles.input}
            placeholder="New Folder Name"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <View style={styles.renderColors}>{this.renderColors()}</View>

          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: this.state.color }]}
            onPress={this.createFolder}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    position: "absolute",
    top: 68,
    left: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.black,
  },
  input: {
    height: 50,
    marginVertical: 20,
    alignSelf: "center",
  },
  addButton: {
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.black,
  },
  customColors: {
    borderRadius: 12,
    width: 45,
    height: 45,
    margin: 5,
  },
  renderColors: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  closeButton: {
    position: "absolute",
    top: 68,
    right: 24,
  },
});
