import BallRender from "../components/Ball";
import Matter from "matter-js";
import FloorRender from "../components/Floor";
import ObstacleRender from "../components/Obstacles";
import { getPipeSizePosPair, windowHeight, windowWidth } from "../utils/random";
import PaperPlaneRender from "../components/Plane";

const restart = () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;

  world.gravity.y = 0.4;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);
  const pipeSizePosC = getPipeSizePosPair(windowWidth * 1.8);
  // const pipeSizePosD = getPipeSizePosPair(windowWidth * 2.4);


  return {
    physics: { engine, world },
    // Plane:PaperPlaneRender(world,"yellow",{ x: 50, y: 200 }),
    Ball: BallRender(
      world,
      "orange",
      { x: 50, y: 400 },
      { height: 50, width: 50 }
    ),
    ObstacleTop1: ObstacleRender(
      world,
      "ObstacleTop1",
      "green",
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size
    ),
    ObstacleTop2: ObstacleRender(
      world,
      "ObstacleTop2",
      "green",
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size
    ),
    ObstacleBottom1: ObstacleRender(
      world,
      "ObstacleBottom1",
      "green",
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size
    ),
    ObstacleBottom2: ObstacleRender(
      world,
      "ObstacleBottom2",
      "green",
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size
    ),
    ObstacleTop3: ObstacleRender(
      world,
      "ObstacleTop3",
      "green",
      pipeSizePosC.pipeTop.pos,
      pipeSizePosC.pipeTop.size
    ),
    ObstacleBottom3: ObstacleRender(
      world,
      "ObstacleBottom3",
      "green",
      pipeSizePosC.pipeBottom.pos,
      pipeSizePosC.pipeBottom.size
    ),
    Floor: FloorRender(
      world,
      "brown",
      { x: windowWidth / 2, y: windowHeight },
      { height: 100, width: windowWidth }
    ),
  };
};

export default restart;
