import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Icon from "@expo/vector-icons";
import SettingsScreen from "./screens/SettingsScreen";
import ExercisesScreen from "./screens/ExercisesScreen";
import HomeScreen from "./screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ExerciseInfo from "./screens/ExerciseInfo";
import PlansScreen from "./screens/PlansScreen";
import PlanInfo from "./screens/PlanInfo";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#242038" },
          tabBarActiveTintColor: "#BDBDBD",
          tabBarInactiveTintColor: "#fff",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            tabBarIcon: ({ focused, size, color }) => (
              <Icon.Feather name="home" color={color} size={size} />
            ),
            headerShown: true,
            headerStyle: { backgroundColor: "#242038" },
            headerTintColor: "white",
          }}
        />
        <Tab.Screen
          name="Exercises"
          component={ExercisesStack}
          options={{
            title: "Übungen",
            tabBarIcon: ({ focused, size, color }) => (
              <Icon.Feather name="layers" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Plans"
          component={PlansStack}
          options={{
            title: "Pläne",
            tabBarIcon: ({ focused, size, color }) => (
              <Icon.Feather name="clipboard" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Einstellungen",
            tabBarIcon: ({ focused, size, color }) => (
              <Icon.Feather name="settings" size={size} color={color} />
            ),
            headerStyle: { backgroundColor: "#242038" },
            headerTintColor: "white",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function ExercisesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExercisesScreen"
        component={ExercisesScreen}
        options={{
          title: "Übungen",
          headerStyle: { backgroundColor: "#242038" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="ExerciseInfo"
        component={ExerciseInfo}
        options={({route}) => {
          const exerciseName = route.params.exerciseName;
          return {
            headerTitle: exerciseName,
            headerStyle: { backgroundColor: "#242038" },
            headerTintColor: "white",
          }
        }}
      />
    </Stack.Navigator>
  );
}

function PlansStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PlansScreen"
        component={PlansScreen}
        options={{
          title: "Meine Pläne",
          headerStyle: { backgroundColor: "#242038" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="PlanInfo"
        component={PlanInfo}
        options={{
          title: "Plan",
          headerStyle: { backgroundColor: "#242038" },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}
