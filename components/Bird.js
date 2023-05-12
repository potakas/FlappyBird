import Matter from "matter-js";

import { ImageBackground, View } from "react-native";

const Bird = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: "solid",
        borderRadius:widthBody/2,
        backgroundColor:color,
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    >
      <ImageBackground
        source={require("../images/ball.png")}
        style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
      />
    </View>
  );
};

const BirdRender = (world, color, pos, size) => {
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Bird" }
  );
  Matter.World.add(world, initialBird);

  return {
    body: initialBird,
    color: color,
    pos: pos,
    renderer: <Bird />,
  };
};
export default BirdRender;
