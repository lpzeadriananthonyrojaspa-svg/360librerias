import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import type { Mesh } from 'three';
import './App.css';

// Primera figura: Cubo
function Cubo() {
  const cubo = useRef<Mesh>(null);
  const [color, setColor] = useState('tomato');
  const [encima, setEncima] = useState(false);

  useFrame((_, delta) => {
    if (cubo.current) {
      cubo.current.rotation.y += delta; // Gira continuamente 360° en el eje Y
    }
  });

  return (
      <mesh
          ref={cubo}
          position={[-2, 0, -4]} // Ubicado a la izquierda
          scale={encima ? 1.4 : 1}
          onPointerOver={() => setEncima(true)}
          onPointerOut={() => setEncima(false)}
          onClick={() => setColor(color === 'tomato' ? 'royalblue' : 'tomato')}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
  );
}

// Segunda figura: Toroide (Dona)
function Toroide() {
  const toroide = useRef<Mesh>(null);
  const [encima, setEncima] = useState(false);

  useFrame((_, delta) => {
    if (toroide.current) {
      toroide.current.rotation.x += delta; // Gira continuamente 360° en el eje X
      toroide.current.rotation.y += delta * 0.5;
    }
  });

  return (
      <mesh
          ref={toroide}
          position={[2, 0.5, -4]} // Ubicado en otra posición (a la derecha y un poco más arriba)
          scale={encima ? 1.4 : 1}
          onPointerOver={() => setEncima(true)}
          onPointerOut={() => setEncima(false)}
      >
        <torusGeometry args={[0.7, 0.25, 16, 32]} />
        <meshStandardMaterial color="gold" />
      </mesh>
  );
}

export default function App() {
  return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas camera={{ position: [0, 0, 0.1] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/* Fondo 360° (asegúrate de tener 360.jpg dentro de la carpeta public/) */}
          <Environment files="360.jpg" background />

          {/* Las 2 figuras geométricas */}
          <Cubo />
          <Toroide />

          {/* Permite mirar alrededor en 360° arrastrando con el mouse */}
          <OrbitControls />
        </Canvas>
      </div>
  );
}