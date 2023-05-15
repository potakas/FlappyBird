import Matter from "matter-js";
import { ImageBackground, View } from "react-native";

const PaperPlane = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        // borderWidth: 1,
        // borderColor: "black",
        // borderStyle: "solid",
        // borderRadius: widthBody / 2,
        backgroundColor: 'transparent',
        position: "absolute",
        left: xBody,
        top: yBody,
        width: 60,
        height: 30,
      }}
    >
      <ImageBackground
        source={require("../images/paper_plane.png")}
        style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
      />
    </View>
  );
};

const PaperPlaneRender = (world, color, pos, size) => {
  // Define the vertices for the paper plane shape
  const paperPlaneVertices = [
    { x: -20, y: 0 },       // vertex 0
    { x: -10, y: 0 },       // vertex 1
    { x: -10, y: -10 },     // vertex 2
    { x: 0, y: -10 },       // vertex 3
    { x: 0, y: -20 },       // vertex 4
    { x: 10, y: -20 },      // vertex 5
    { x: 10, y: 0 },        // vertex 6
    { x: 20, y: 0 },        // vertex 7
    { x: 10, y: 20 },       // vertex 8
    { x: 0, y: 20 },        // vertex 9
  ];

  // Create the paper plane body using the vertices
  const paperPlane = Matter.Bodies.fromVertices(pos.x, pos.y, paperPlaneVertices);

  Matter.World.add(world, paperPlane);

  return {
    body: paperPlane,
    color: color,
    pos: pos,
    renderer: <PaperPlane />,
  };
};

export default PaperPlaneRender;
