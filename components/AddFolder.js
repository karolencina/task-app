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
      const {name, color} = this.state;

     const folder = { name, color }

     this.props.addFolder(folder)

      this.setState({name: "" });
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
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>Add a new Folder</Text>
          <TextInput
            style={styles.input}
            placeholder="New Folder Name"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: 10
            }}
          >
            {this.renderColors()}
          </View>

          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: this.state.color }]} onPress={this.createFolder}
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
  title: {
    fontSize: 24,
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    height: 50,
    marginTop: 8,
    alignSelf: "center",
  },
  addButton: {
    marginTop: 24,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.black,
  },
  customColors: {
    borderRadius: 10,
    width: "26%",
    paddingTop: "26%",
    margin: 10
  },
});
