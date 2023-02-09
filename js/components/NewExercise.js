import { useState } from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Button,
  ScrollView,
  Dimensions,
  Text,
  LogBox,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import FireBase from "../../FireBase";
import Data from "../Data";
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

const width = Dimensions.get("window").width;

export default function NewExercise({ onCancel }) {
  const [exercise, setExerciseName] = useState(null);
  const [content, setContent] = useState(null);

  const [open, setOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [items, setItems] = useState([
    { label: "Leicht", value: 0 },
    { label: "Mittel", value: 1 },
    { label: "Schwer", value: 2 },
  ]);

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedFocus1, setSelectedFocus1] = useState(null);
  const [selectedFocus2, setSelectedFocus2] = useState(null);
  const [focus, setFocus] = useState([
    { label: "Vorhand", value: "Vorhand" },
    { label: "Rückhand", value: "Rückhand" },
    { label: "Aufschlag", value: "Aufschlag" },
    { label: "Volley", value: "Volley" },
    { label: "Topspin", value: "Topspin" },
    { label: "Slice", value: "Slice" },
    { label: "Return", value: "Return" },
    { label: "Beinarbeit", value: "Beinarbeit" },
    { label: "Schnelligkeit", value: "Schnelligkeit" },
    { label: "Reaktion", value: "Reaktion" },
    { label: "Taktik", value: "Taktik" },
  ]);

  const [open3, setOpen3] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState(null);
  const [fieldTypes, setFieldTypes] = useState([
    { label: "Kleinfeld", value: 0 },
    { label: "Mid-Court", value: 1 },
    { label: "Großfeld", value: 2 },
  ]);

  const [demoVideo, setDemoVideo] = useState(null);

  return (
    <Modal onRequestClose={onCancel} animationType="slide">
      <View contentContainerStyle={{ alignItems: "center" }}>
        <KeyboardAvoidingView
          style={{
            marginTop: 50,
            width: width,
            alignItems: "center",
            flexDirection: "column-reverse",
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "5%",
            }}
          >
            <Button
              title="Erstellen"
              onPress={async () => {
                if (
                  exercise !== null &&
                  content !== null &&
                  selectedDifficulty !== null &&
                  selectedFocus1 !== null &&
                  selectedFieldType !== null
                ) {
                  const data = [
                    {
                      exerciseName: exercise,
                      difficulty: selectedDifficulty,
                      fieldType: selectedFieldType,
                      focus: [selectedFocus1, selectedFocus2],
                      description: content,
                      demoVideo: demoVideo,
                    },
                  ];
                  console.log(data);
                  await FireBase.saveExercise(
                    data[0].exerciseName,
                    data[0].difficulty,
                    data[0].fieldType,
                    data[0].focus,
                    data[0].description,
                    data[0].demoVideo,
                    "null"
                  );
                  Data.exercises = await FireBase.getExercises();
                  onCancel();
                } else {
                  alert("Bitte alle nicht optionalen Felder ausfüllen");
                }
              }}
            />
            <View style={{ width: "20%" }}></View>
            <Button title="Abbrechen" onPress={onCancel} />
          </View>

          <TextInput
            placeholder="Link zum Beispielvideo (optional)"
            style={[styles.input, { marginTop: "2%" }]}
            onChangeText={setDemoVideo}
            returnKeyType="done"
          />

          <DropDownPicker
            style={{}}
            open={open3}
            value={selectedFieldType}
            items={fieldTypes}
            setOpen={setOpen3}
            setValue={setSelectedFieldType}
            setItems={setFieldTypes}
            containerProps={{ style: styles.dropdown }}
          />

          <Text style={{fontWeight: "bold", fontSize: 12, marginBottom: "2%"}}>Feldgröße</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <DropDownPicker
              style={{}}
              open={open1}
              value={selectedFocus1}
              items={focus}
              setOpen={setOpen1}
              setValue={setSelectedFocus1}
              setItems={setFocus}
              containerProps={{
                style: {
                  maxWidth: "35%",
                  marginHorizontal: "2%",
                  marginBottom: "3%",
                },
              }}
            />
            <DropDownPicker
              style={{}}
              open={open2}
              value={selectedFocus2}
              items={focus}
              setOpen={setOpen2}
              setValue={setSelectedFocus2}
              setItems={setFocus}
              containerProps={{
                style: {
                  maxWidth: "35%",
                  marginHorizontal: "2%",
                  marginBottom: "3%",
                },
              }}
            />
          </View>
          <Text
              style={{
                paddingVertical: "3%",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              Fokus der Übung
            </Text>
          <DropDownPicker
            style={{}}
            open={open}
            value={selectedDifficulty}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedDifficulty}
            setItems={setItems}
            containerProps={{ style: styles.dropdown }}
          />
          <Text style={{fontWeight: "bold", fontSize: 12, marginBottom: "2%"}}>Schwierigkeitsgrad</Text>
          <TextInput
            placeholder="Beschreibung"
            style={[styles.input, styles.descriptionInput]}
            multiline={true}
            onChangeText={setContent}
            returnKeyType="done"
          />

          <TextInput
            placeholder="Name der Übung"
            style={styles.input}
            onChangeText={setExerciseName}
            returnKeyType="done"
          />
          <Text
            style={{ paddingVertical: 20, fontSize: 20, fontWeight: "bold" }}
          >
            Neue Übung erstellen
          </Text>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

function submitExercise(data) {
  FireBase.saveExercise(data);
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "darlslateblue",
    borderRadius: 5,
    marginBottom: "2%",
    padding: 10,
    width: "80%",
    fontSize: 16,
  },
  descriptionInput: {
    height: 200,
    textAlignVertical: "top",
  },
  dropdown: {
    width: "80%",
    marginHorizontal: "10%",
  },
});
