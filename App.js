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
  const [showHighScores, setShowHighScores] = useState(false);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    const getHighScoreList = async () => {
      try {
        const highScoreListJson = await AsyncStorage.getItem("highScoreList");
        const scoreList = JSON.parse(highScoreListJson);
        console.log("SCORELIST=>", scoreList);
        if (scoreList) {
          setHighScoreList(scoreList);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHighScoreList();
  }, []);

  useEffect(() => {
    const getHighScore = async () => {
      const highScoreString = await AsyncStorage.getItem("highscore");
      if (highScoreString && !highScore) {
        console.log("NEW HIGHSCORE");
        const highScoreObject = JSON.parse(highScoreString);
        //correct possition
        const updatedHighScoreList = [...highScoreList, { ...highScoreObject }];
        updatedHighScoreList.sort((a, b) => b.points - a.points);
        // setHighScoreList([highScoreObject, ...highScoreList.slice(0, 4)]);
        setHighScoreList(updatedHighScoreList.slice(0, 5));
        const highScoreListJson = JSON.stringify(
          updatedHighScoreList.slice(0, 5)
        );
        try {
          await AsyncStorage.setItem("highScoreList", highScoreListJson);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getHighScore();
    AsyncStorage.removeItem("highscore");
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
            textAlign: "left",
            fontSize: 24,
            fontWeight: "bold",
            margin: 20,
            zIndex: 100,
          }}
        >
          Lives:{lives}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
            fontWeight: "bold",
            margin: 20,
            zIndex: 100,
          }}
        >
          {points}
        </Text>
        {highScore && (
          <View
            style={{
              // flex: 0,
              // flexDirection: "column",
              width: "50%",
              alignSelf: "center",
              zIndex: 100,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 8,
              backgroundColor: "gray",
            }}
          >
            <Text>Name</Text>
            <TextInput
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                padding: 4,
                width: "80%",
              }}
              onChangeText={(text) => {
                setName(text);
              }}
              value={name}
            />
            <Text>Score</Text>
            <Text
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                padding: 4,
                width: "50%",
                textAlign: "center",
              }}
            >
              {points}
            </Text>
            <Button
              title="SUBMIT"
              onPress={() => {
                console.log("NAME IS=>", name, "POINTS ARE=>", points);
                AsyncStorage.setItem(
                  "highscore",
                  JSON.stringify({ name, points })
                );
                setHighScore(false);
              }}
            />
          </View>
        )}
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
                    // const updatedHighScoreList = [
                    //   ...highScoreList.slice(0, i),
                    //   { name, points },
                    //   ...highScoreList.slice(i + 1),
                    // ];
                    // setHighScoreList(updatedHighScoreList);
                    setHighScore(true);
                    break;
                  }
                }
                gameEngine.stop();
                break;
              case "new_point":
                // Check if point_counter is a multiple of 20
                if (points % 20 === 0 && points >0) {
                  setLives(lives + 1); // Increment lives by one
                }
                setPoints(points + 1);
                
                break;
              case "lose_life":
                setLives(lives - 1);
                gameEngine.swap(restart());
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
        {!running && !highScore ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 8,
                margin: 16,
              }}
              onPress={() => {
                setPoints(0);
                setRunning(true);
                setGameOver(false);
                setLives(3);
                gameEngine.swap(restart());
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 30 }}
              >
                START GAME
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 8,
                margin: 16,
              }}
              onPress={() => setShowHighScores(true)}
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 30 }}
              >
                HIGHSCORES
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {showHighScores && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {highScoreList.map((player, index) => (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
                key={index}
              >
                {player.name}: {player.points}
              </Text>
            ))}
            <TouchableOpacity
              style={{ backgroundColor: "black", borderRadius: 8, padding: 10 }}
              onPress={() => setShowHighScores(false)}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!gameOver && (
          <View
            style={{
              width: 40,
              height: 40,
              right: 0,
              marginRight: 0,
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
      </ImageBackground>
    </View>
  );
}
