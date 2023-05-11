import BirdRender from "../components/Bird";
import Matter from "matter-js";
import FloorRender from "../components/Floor";
import { Dimensions } from "react-native";

const windowHeight= Dimensions.get("window").height;
const windowWidth= Dimensions.get("window").width;

const restart = () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;

  world.gravity.y = 0.4;

  return {
    physics: { engine, world },
    Bird: BirdRender(
      world,
      "green",
      { x: 50, y: 400 },
      { height: 40, width: 40 }
    ),
    Floor:FloorRender(
      world,
      "brown",
      {x:windowWidth/2, y:windowHeight},
      {height: 50, width: windowWidth}
    )
  };
};

export default restart