import React from "react";
import Plane from "./Plane";
import BackDrop from "./BackDrop";

function Skybox() {
  return (
    <>
      <Plane position={[0, -30, 0]} />
      <Plane position={[0, 30, 0]} />
      <BackDrop rotation={[0, 0, 0]} position={[0, -1, -50]} />
      <BackDrop rotation={[0, Math.PI / 2, 0]} position={[-50, -1, 0]} />
      <BackDrop rotation={[0, Math.PI / 2, 0]} position={[50, -1, 0]} />
      <BackDrop rotation={[0, 0, 0]} position={[0, -1, 50]} />
    </>
  );
}

export default Skybox;
