import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF, Edges } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import sandImage from '../assets/sand.png'

import wallsandroof from '../assets/wallsandroof-33.glb';
import palm from '../assets/NewPalm-4.glb'


export const Palm = (props) => {

  const sandTexture = useLoader(TextureLoader, sandImage)


    const ref = useRef()
    
    function Palm() {
        const gltf = useLoader(GLTFLoader, palm)
        gltf.scene.traverse( function( node ) {
          if ( node.isMesh ) { 
            node.castShadow = true; 
            node.receiveShadow = true; 
            node.material.metalness = 0;
          }
        } );

        return <primitive object={gltf.scene} scale={[.12, .12, .12]} position={[0, 0, -26.5]} rotation={[0, -Math.PI/2, 0]} />
   
    }

    return (
      <>
      <Palm />
      <mesh
        position={[-2.695, 0, -28.45]}
      >
        <boxGeometry 
          args={[2, 2, 2]}
        />
        <meshBasicMaterial attach="material-0" map={sandTexture} /> 
        <meshBasicMaterial attach="material-1" map={sandTexture} /> 
        <meshBasicMaterial attach="material-2" map={sandTexture} /> 
        <meshBasicMaterial attach="material-3" map={sandTexture} />
        <meshBasicMaterial attach="material-4" map={sandTexture} /> 
        <meshBasicMaterial attach="material-5" map={sandTexture} /> 
        <Edges color="black" />
      </mesh>
      </>
    )

}