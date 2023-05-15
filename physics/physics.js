import Matter from "matter-js";
import { getPipeSizePosPair, windowWidth } from "../utils/random";

let point_counter=0;
const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;
  let xTranslation = -3 - Math.floor(point_counter / 20); // to increase the speed of obstacles

  //touch to jump logic
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Ball.body, {
        x: 0.001,
        y: -5,
      });
    });

  Matter.Engine.update(engine, time.delta);
  for (let i = 1; i <= 3; i++) {
    if (
      entities[`ObstacleTop${i}`].body.bounds.max.x <= 50 &&
      !entities[`ObstacleTop${i}`].point
    ) {
      entities[`ObstacleTop${i}`].point = true;
      point_counter=point_counter+1
      dispatch({ type: "new_point" });
    }


    if (entities[`ObstacleTop${i}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 1.6);

      Matter.Body.setPosition(
        entities[`ObstacleTop${i}`].body,
        pipeSizePos.pipeTop.pos
      );
      Matter.Body.setPosition(
        entities[`ObstacleBottom${i}`].body,
        pipeSizePos.pipeBottom.pos
      );
      entities[`ObstacleTop${i}`].point = false;
    }
    Matter.Body.translate(entities[`ObstacleTop${i}`].body, { x: xTranslation, y: 0 });
    Matter.Body.translate(entities[`ObstacleBottom${i}`].body, { x: xTranslation, y: 0 });
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    dispatch({ type: "game_over" });
    point_counter=0; // reset the counter after game over
  });

  return entities;
};

export default Physics;
