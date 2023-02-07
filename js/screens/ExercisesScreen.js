import React from "react";
import { StyleSheet, View, FlatList, Pressable } from "react-native";
import { Component } from "react";
import Exercise from "../components/Exercise";
import { Feather } from "@expo/vector-icons";

const exercises = [
  {
    exerciseName: "Beispiel Übung",
    difficulty: 0,
    fieldType: "Midcourt",
    focus: ["Beine", "Vorhand"],
    description: "Bei dieser Übung muss man...",
    demoVideo: "youtube.com",
    sketch: ".../bsp.png",
  },
  {
    exerciseName: "Rotary",
    difficulty: 0,
    fieldType: "Midcourt",
    focus: ["Beine", "Vorhand"],
    description: "Bei dieser Übung muss man...",
    demoVideo: "youtube.com",
    sketch: ".../bsp.png",
  },
];

export default class ExercisesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={exercises}
          keyExtractor={(item) => item.exerciseName}
          renderItem={({ item }) => (
            <Exercise
              exerciseName={item.exerciseName}
              description={item.description}
              focus={item.focus}
              difficulty={item.difficulty}
              fieldType={item.fieldType}
              onPress={() =>
                this.props.navigation.navigate("ExerciseInfo", {
                  exerciseName: item.exerciseName,
                })
              }
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        />
        <Pressable
          onPress={() => alert("Modal für neue Übung anzeigen")}
          style={styles.new}
        >
          <Feather name="plus-square" size={36} color="darkslateblue" />
        </Pressable>
        <Pressable
          onPress={() => alert("Filter anzeigen")}
          style={styles.filter}
        >
          <Feather name="filter" size={36} color="darkslateblue" />
        </Pressable>
        <Pressable
          onPress={() => alert("Übungen aus API aktualisieren")}
          style={styles.refresh}
        >
          <Feather name="refresh-cw" size={36} color="darkslateblue" />
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    marginTop: 64,
  },
  listSeparator: {
    height: 2,
    backgroundColor: "darkgray",
  },
  new: {
    position: "absolute",
    top: "2%",
    right: "3%",
  },
  filter: {
    position: "absolute",
    top: "2%",
    left: "3%",
  },
  refresh: {
    position: "absolute",
    top: "2%",
  },
});
