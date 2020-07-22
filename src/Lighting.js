import React from "react";

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} castShadow penumbra={1} />
      {/* Keylight */}
      <rectAreaLight
        width={5}
        height={5}
        color={"#ffbdf4"}
        intensity={5.6}
        position={[8, 15, 10]}
        lookAt={[0, 0, 0]}
        penumbra={1}
        castShadow
      />
      <rectAreaLight
        width={5}
        height={5}
        intensity={2.6}
        color={"#bdefff"}
        position={[12, 15, 4]}
        lookAt={[0, 0, 0]}
        penumbra={2}
        castShadow
      />
      <rectAreaLight
        width={5}
        height={5}
        intensity={54}
        color={"#fff"}
        position={[11, 15, -2]}
        rotation={[0, 180, 0]}
        castShadow
      />
    </>
  );
}

export default Lighting;
