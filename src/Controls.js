import React, { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { extend, useThree, useFrame } from "react-three-fiber";
import "./styles.scss";

extend({ OrbitControls });

export default function Controls() {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      // auto-rotates (but is still dragable)
      // autoRotate
      enablePan={false}
      enableZoom={false}
      ref={orbitRef}
      args={[camera, gl.domElement]}
    />
  );
}
