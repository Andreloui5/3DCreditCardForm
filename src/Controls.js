import React, { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { extend, useThree, useFrame } from "react-three-fiber";
import "./styles.scss";

extend({ OrbitControls });

export default function Controls() {
  // Imports controls for the animation
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      // disables ability to pan and zoom the camera
      enablePan={false}
      enableZoom={false}
      ref={orbitRef}
      args={[camera, gl.domElement]}
    />
  );
}
