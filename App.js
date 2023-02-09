import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import Navigation from "./js/Navigation";
import FireBase from "./FireBase";
import Data from "./js/Data";

export default function App() {
  useEffect(() => {
    FireBase.init();
    loadExercises();
  }, []);

  async function loadExercises() {
    const exercisesFromDB = await FireBase.getExercises();
    Data.exercises = exercisesFromDB;
  }
  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
