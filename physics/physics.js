import Matter from "matter-js";
import { getPipeSizePosPair, windowWidth } from "../utils/random";

let point_counter = 0;
let lives = 3;
let obstacleCollision = false;

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;
  let xTranslation = -3 - Math.floor(point_counter / 20); // to increase the speed of obstacles

  // Touch to jump logic
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Ball.body, {
        x: 0.001,
        y: -5,
      });
    });

  Matter.Engine.update(engine, time.delta);

  // Check for obstacle collisions
  for (let i = 1; i <= 3; i++) {
    if (
      entities[`ObstacleTop${i}`].body.bounds.max.x <= 50 &&
      !entities[`ObstacleTop${i}`].point
    ) {
      entities[`ObstacleTop${i}`].point = true;
      point_counter++;
      if (point_counter % 20 === 0 && point_counter>0) {
        lives++; // Increment lives by one
      }
      dispatch({ type: "new_point" });
      // Check if point_counter is a multiple of 20
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

    Matter.Body.translate(entities[`ObstacleTop${i}`].body, {
      x: xTranslation,
      y: 0,
    });
    Matter.Body.translate(entities[`ObstacleBottom${i}`].body, {
      x: xTranslation,
      y: 0,
    });
  }

  // Check for ball collision with obstacles
  Matter.Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((pair) => {
      if (event.pairs) {
        obstacleCollision = true;
      }
    });
  });

  // Handle losing a life and resetting ball position
  if (obstacleCollision && lives > 0) {
    lives--;
    obstacleCollision = false;
    dispatch({ type: "lose_life" });
  }

  // Handle game over
  if (lives === 0) {
    dispatch({ type: "game_over" });
    point_counter = 0; // Reset the counter after game over
    lives=3;
  }

  return entities;
};

export default Physics;
