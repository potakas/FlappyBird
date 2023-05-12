import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import restart from "./entities";
import Physics from "./physics/physics";
import { TouchableOpacity } from "react-native";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [points, setPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  useEffect(() => {
    setRunning(false);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "cyan" }}>
      <ImageBackground
        source={require("./images/sky.png")}
        style={{ flex: 1, resizeMode: "cover" }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
            fontWeight: "bold",
            margin: 20,
          }}
        >
          {points}
        </Text>
        <GameEngine
          ref={(ref) => {
            setGameEngine(ref);
          }}
          systems={[Physics]}
          entities={restart()}
          running={running}
          onEvent={(e) => {
            switch (e.type) {
              case "game_over":
                setRunning(false);
                setGameOver(true);
                gameEngine.stop();
                break;
              case "new_point":
                setPoints(points + 1);
                break;
            }
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <StatusBar style="auto" hidden={true} />
        </GameEngine>
        {!running ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 8,
              }}
              onPress={() => {
                setPoints(0);
                setRunning(true);
                setGameOver(false);
                gameEngine.swap(restart());
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 30 }}
              >
                START GAME
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {!gameOver && (
          <View
            style={{
              width: 40,
              height: 40,
              marginLeft: 16,
              marginTop: 16,
              position: "absolute",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "orange",
                borderRadius: 4,
              }}
              onPress={() => {
                // setPoints(0);
                setRunning(!running);
                // gameEngine.swap((restart()))
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 20, textAlign:'center' }}
              >
                {running ? "\u23F8" : "\u25B6"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}
