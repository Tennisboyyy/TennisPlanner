import React from "react";
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

const difficultyArray = [
  "Leicht",
  "Mittel",
  "Schwer",
  "#61A164",
  "#DBCF68",
  "#DA4D4D",
];

const fieldArray = [
  "Kleinfeld",
  "Mid-Court",
  "Großfeld",
  "#E53F3B",
  "#EBA44A",
  "#D7C949",
];

const exercises = [
  {
    name: "Beispiel Übung",
    difficulty: 0,
    fieldType: "Midcourt",
    focus: ["Beine", "Vorhand"],
    description: "Bei dieser Übung muss man...",
    demoVideo: "youtube.com",
    sketch: ".../bsp.png",
  },
];

export default function (props) {
  const {
    exerciseName,
    description,
    difficulty,
    focus,
    fieldType,
    demoVideo,
    sketch,
    onPress,
  } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{exerciseName}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.properties, { backgroundColor: "lightgray" }]}>
            <Text>
              {focus[1] !== null ? focus[0] + ", " + focus[1] : focus[0]}
            </Text>
          </View>
          <View
            style={[
              styles.properties,
              { backgroundColor: difficultyArray[difficulty + 3] },
            ]}
          >
            <Text>{difficultyArray[difficulty]}</Text>
          </View>
          <View
            style={[
              styles.properties,
              { backgroundColor: fieldArray[fieldType + 3] },
            ]}
          >
            <Text>{fieldArray[fieldType]}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "column",
    alignItems: "left",
    width: "100%",
    backgroundColor: "aliceblue",
  },
  properties: {
    flexDirection: "row",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 15,
    marginTop: 5,
    marginRight: 5,
  },
});
