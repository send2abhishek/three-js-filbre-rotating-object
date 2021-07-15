import React, { useRef } from "react";
import "./App.css";

import { Canvas, useFrame } from "react-three-fiber";
import { softShadows, OrbitControls } from "drei";

softShadows();

const SpinningMesh = ({ position, args, color }) => {
  const meshRef = useRef();

  useFrame(
    () => (meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01)
  );

  return (
    <mesh castShadow position={position} ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
};

function App() {
  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1}
          shadowCameraFar={50}
          shadowCameraLeft={-10}
          shadowCameraRight={10}
          shadowCameraTop={10}
          shadowCameraBottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <SpinningMesh
            position={[0, 1, 0]}
            args={[3, 2, 1]}
            color="lightblue"
          />
          <SpinningMesh position={[-2, 1, -5]} color="pink" />
          <SpinningMesh position={[5, 1, -2]} color="pink" />
        </group>

        {/* <Box>
          <meshStandardMaterial attach="material" />
        </Box> */}
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
