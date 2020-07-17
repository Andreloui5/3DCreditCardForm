/*
auto-generated by: https://github.com/react-spring/gltfjsx
author: esteban-fuentealba (https://sketchfab.com/esteban-fuentealba)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/credit-card-a3c78592cd3a435ab0dc347003107fbd
title: credit card
*/

import React, { useRef } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { draco } from "drei";

export default function Model() {
  const group = useRef();
  const { nodes, materials } = useLoader(
    GLTFLoader,
    "../credit_card/scene.gltf",
    draco("/draco-gltf/")
  );
  return (
    <group ref={group} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          material={materials.material_0}
          geometry={nodes.mesh_0.geometry}
        />
      </group>
    </group>
  );
}
