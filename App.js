import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import restart from "./entities";
import Physics from "./physics/physics";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [points, setPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [name, setName] = useState("");
  const [highScoreList, setHighScoreList] = useState([
    { name: "noname", points: 0 },
    { name: "noname", points: 0 },
    { name: "noname", points: 0 },
    { name: "noname", points: 0 },
    { name: "noname", points: 0 },
  ]);
  const [highScore, setHighScore] = useState(false);
  useEffect(() => {
    const getHighScore = async () => {
      const highScoreString = await AsyncStorage.getItem("highscore");
      if (highScoreString) {
        console.log("NEW HIGHSCORE");
        const highScoreObject = JSON.parse(highScoreString);
        setHighScoreList([highScoreObject, ...highScoreList.slice(0, 4)]);
      }

      console.log("HIGHSCORE IS=>", highScoreList);
    };
    getHighScore();
    setRunning(false);
  }, [highScore]);
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
                for (let i = 0; i < highScoreList.length; i++) {
                  if (points > highScoreList[i].points) {
                    const updatedHighScoreList = [
                      ...highScoreList.slice(0, i),
                      { name, points },
                      ...highScoreList.slice(i + 1),
                    ];
                    setHighScoreList(updatedHighScoreList);
                    setHighScore(true);
                    break;
                  }
                }
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
                setRunning(!running);
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {running ? "\u23F8" : "\u25B6"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {highScore && (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Name</Text>
            <TextInput
              autoCapitalize={false}
              onChangeText={(text) => {
                setName(text);
              }}
              value={name}
            />
            <Text>Score</Text>
            <Text>{points}</Text>
            <Button
              title="SUBMIT"
              onPress={() => {
                AsyncStorage.setItem(
                  "highscore",
                  JSON.stringify({ name, points })
                );
                setHighScore(false);
              }}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
}
