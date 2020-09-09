import React from "react";
import BackDrop from "./BackDrop";

function Skybox() {
  //This uses the backdrop and plane elements to create the skybox
  return (
    <>
      <BackDrop
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -30, 0]}
        opacity={0.3}
      />
      <BackDrop
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 30, 0]}
        opacity={0.3}
      />
      <BackDrop rotation={[0, 0, 0]} position={[0, -1, -50]} opacity={0.35} />
      <BackDrop
        rotation={[0, Math.PI / 2, 0]}
        position={[-50, -1, 0]}
        opacity={0.35}
      />
      <BackDrop
        rotation={[0, Math.PI / 2, 0]}
        position={[50, -1, 0]}
        opacity={0.35}
      />
      <BackDrop rotation={[0, 0, 0]} position={[0, -1, 50]} opacity={0.35} />
    </>
  );
}

export default Skybox;
