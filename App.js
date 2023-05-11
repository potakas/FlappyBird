import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
// import entities from './entities'
import restart from "./entities";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <GameEngine
        entities={restart()}
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
