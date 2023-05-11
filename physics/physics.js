import Matter from "matter-js";
import { getPipeSizePosPair, windowWidth } from "../utils/random";

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  //touch to jump logic
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -8,
      });
    });

  Matter.Engine.update(engine, time.delta);
  for (let i = 1; i <= 2; i++) {
    if(entities[`ObstacleTop${i}`].body.bounds.max.x<=0){
        const pipeSizePos= getPipeSizePosPair(windowWidth*0.9)

        Matter.Body.setPosition(entities[`ObstacleTop${i}`].body, pipeSizePos.pipeTop.pos);
        Matter.Body.setPosition(entities[`ObstacleBottom${i}`].body, pipeSizePos.pipeBottom.pos);
    }
    Matter.Body.translate(entities[`ObstacleTop${i}`].body, { x: -3, y: 0 });
    Matter.Body.translate(entities[`ObstacleBottom${i}`].body, { x: -3, y: 0 });
  }

  return entities;
};

export default Physics;
