import React from "react";
import { StyleSheet, View, FlatList, Pressable, ActivityIndicator } from "react-native";
import { Component } from "react";
import Exercise from "../components/Exercise";
import { Feather } from "@expo/vector-icons";
import FireBase from "../../FireBase";
import Data from "../Data";
import NewExercise from "../components/NewExercise";

let loading = false;
let showAdd = false;

export default class ExercisesScreen extends Component {
  render() {
    async function saveExercise(data) {
      await FireBase.saveExercise(
        data.exerciseName,
        data.difficulty,
        data.fieldType,
        data.focus,
        data.description,
        data.demoVideo,
        data.sketch
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={Data.exercises}
          keyExtractor={(item) => item.id}
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
          onPress={() => {
            showAdd = true;
            this.forceUpdate();
          }}
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
          onPress={async () => {
            Data.exercises = [];
            loading = true;
            this.forceUpdate();
            Data.exercises = await FireBase.getExercises();
            loading = false;
            this.forceUpdate();
          }}
          style={styles.refresh}
        >
          <Feather name="refresh-cw" size={36} color="darkslateblue" />
        </Pressable>
        {loading === true ? <ActivityIndicator size='large' color='#242038' style={styles.load}/> : <></>}
        {showAdd === true ? <NewExercise onCancel={() => {showAdd = false; this.forceUpdate()}} /> : <></>}
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
  load: {
    position: "absolute"
  }
});
