import Matter from "matter-js";

import { ImageBackground, View } from "react-native";

const Obstacle = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        borderRadius: 2,
        // backgroundColor:color,
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    >
      <ImageBackground
        source={require("../images/pipe.png")}
        style={{flex:1, padding:2, resizeMode:'contain', justifyContent: 'center'}}
      />
    </View>
  );
};

const ObstacleRender = (world, label, color, pos, size) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: { label }, isStatic: true }
  );
  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color: color,
    pos: pos,
    renderer: <Obstacle />,
  };
};
export default ObstacleRender;
