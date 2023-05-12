import Matter from "matter-js";

import { ImageBackground, View } from "react-native";

const Floor = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    >
    <ImageBackground
        source={require("../images/ground.png")}
        style={{ flex: 1, padding:16, flexDirection:'row', resizeMode: "cover"}}
      />
      </View>
  );
};

const FloorRender = (world, color, pos, size) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Floor", isStatic: true }
  );
  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    color: color,
    pos: pos,
    renderer: <Floor />,
  };
};
export default FloorRender;
