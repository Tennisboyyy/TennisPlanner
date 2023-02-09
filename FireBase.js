import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-XOpTN8if3HjwRiv3v3z3CGq6bzGNiuo",
  authDomain: "tennisplannerapp.firebaseapp.com",
  projectId: "tennisplannerapp",
  storageBucket: "tennisplannerapp.appspot.com",
  messagingSenderId: "1086672747156",
  appId: "1:1086672747156:web:1c82386c1e13d4bc9a1281",
};

export default class FireBase {
  static db;

  static init() {
    const app = initializeApp(firebaseConfig);
    FireBase.db = getFirestore(app);
  }

  static async saveExercise(
    exerciseName,
    difficulty,
    fieldType,
    focus,
    description,
    demoVideo,
    sketch
  ) {
    const docRef = await addDoc(collection(FireBase.db, "exercises"), {
      exerciseName,
      difficulty,
      fieldType,
      focus,
      description,
      demoVideo,
      sketch,
    });
    return docRef.id;
  }

  static async getExercises() {
    let exercises = [];
    const querySnapshot = await getDocs(collection(FireBase.db, "exercises"));
    querySnapshot.forEach((exercise) => {
      exercises.push({
        id: exercise.id,
        exerciseName: exercise.data().exerciseName,
        difficulty: exercise.data().difficulty,
        fieldType: exercise.data().fieldType,
        focus: exercise.data().focus,
        description: exercise.data().description,
        demoVideo: exercise.data().demoVideo,
        sketch: exercise.data().sketch,
      });
    });
    return exercises;
  }
}
