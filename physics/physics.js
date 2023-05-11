import Matter from "matter-js";

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
    Matter.Body.translate(entities[`ObstacleTop${i}`].body, { x: -3, y: 0 });
    Matter.Body.translate(entities[`ObstacleBottom${i}`].body, { x: -3, y: 0 });
  }

  return entities;
};

export default Physics;
