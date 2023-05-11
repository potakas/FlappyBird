import BirdRender from "../components/Bird";
import Matter from "matter-js";
import FloorRender from "../components/Floor";
import ObstacleRender from "../components/Obstacles";
import { getPipeSizePosPair, windowHeight, windowWidth } from "../utils/random";

const restart = () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;

  world.gravity.y = 0.4;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);

  return {
    physics: { engine, world },
    Bird: BirdRender(
      world,
      "green",
      { x: 50, y: 400 },
      { height: 40, width: 40 }
    ),
    ObstacleTop1: ObstacleRender(
      world,
      "ObstacleTop1",
      "red",
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size
    ),
    ObstacleTop2: ObstacleRender(
      world,
      "ObstacleTop2",
      "red",
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size
    ),
    ObstacleBottom1: ObstacleRender(
      world,
      "ObstacleBottom1",
      "red",
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size
    ),
    ObstacleBottom2: ObstacleRender(
      world,
      "ObstacleBottom2",
      "red",
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size
    ),
    Floor: FloorRender(
      world,
      "brown",
      { x: windowWidth / 2, y: windowHeight },
      { height: 50, width: windowWidth }
    ),
  };
};

export default restart;
