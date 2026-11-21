import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import type { Mesh } from 'three';
import './App.css';

// Primera figura: Cono (reemplaza al cubo)
function Cono() {
  const cono = useRef<Mesh>(null);
  const [color, setColor] = useState('tomato');
  const [encima, setEncima] = useState(false);

  useFrame((_, delta) => {
    if (cono.current) {
      cono.current.rotation.y += delta;
      cono.current.rotation.z += delta * 0.4;
    }
  });

  return (
      <mesh
          ref={cono}
          position={[-2, 0, -4]}
          scale={encima ? 1.4 : 1}
          onPointerOver={() => setEncima(true)}
          onPointerOut={() => setEncima(false)}
          onClick={() => setColor(color === 'tomato' ? 'royalblue' : 'tomato')}
      >
        <coneGeometry args={[0.8, 1.5, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
  );
}

// Segunda figura: Icosaedro
function Icosaedro() {
  const figura = useRef<Mesh>(null);
  const [encima, setEncima] = useState(false);

  useFrame((_, delta) => {
    if (figura.current) {
      figura.current.rotation.x += delta;
      figura.current.rotation.y += delta * 0.7;
    }
  });

  return (
      <mesh
          ref={figura}
          position={[2, 0.5, -4]}
          scale={encima ? 1.4 : 1}
          onPointerOver={() => setEncima(true)}
          onPointerOut={() => setEncima(false)}
      >
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="mediumspringgreen" />
      </mesh>
  );
}

export default function App() {
  return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas camera={{ position: [0, 0, 0.1] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <Environment files="360.jpg" background />

          <Cono />
          <Icosaedro />

          <OrbitControls />
        </Canvas>
      </div>
  );
}