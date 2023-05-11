import BirdRender from "../components/Bird";
import Matter from "matter-js";

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
  };
};

export default restart