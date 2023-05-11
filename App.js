import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import restart from "./entities";
import Physics from "./physics/physics";

export default function App() {
  const [running, setRunning]= useState(false);
  useEffect(() => {
    setRunning(true);
  },[])
  return (
    <View style={{ flex: 1 }}>
      <GameEngine
      systems={[Physics]}
        entities={restart()}
        running={running}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></GameEngine>
      <StatusBar style="auto" hidden={true} />
    </View>
  );
}
