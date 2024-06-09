import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three'
import { Edges } from '@react-three/drei'

export const Display = ({props, rotation, position, objects, order}) => {
    
    const [displayTexture, setDisplayTexture] = useState(new THREE.Texture());
        
    var rand = '?'+Math.random();

    let string = objects[order].value.data.title;
    // console.log(string)

    useEffect( () => {
      let canvasElement = document.createElement('canvas');
      let textureCanvas = new THREE.CanvasTexture(canvasElement);
      let ctx = canvasElement.getContext('2d');
      canvasElement.width = 100;
      canvasElement.height = 100;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      ctx.font = '12px serif'
      ctx.fillStyle = "black";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(string, canvasElement.width / 2, canvasElement.height / 2)
      // textureCanvas.needsUpdate = true;
      setDisplayTexture(textureCanvas);

      let display = new THREE.Texture(canvasElement);    
    }, [objects])

    const ref = useRef()
    
    return (
      <mesh
        {...props}
        ref={ref}
        position={position}
        rotation={rotation}
        castShadow
        >
        <boxGeometry args={[1, 1, 0.25]} />
        <meshBasicMaterial attach="material-0" color="white" /> 
        <meshBasicMaterial attach="material-1" color="white" /> 
        <meshBasicMaterial attach="material-2" color="white" /> 
        <meshBasicMaterial attach="material-3" color="white" />
        <meshBasicMaterial attach="material-4" map={displayTexture} /> 
        <meshBasicMaterial attach="material-5" color="white"/> 
        <Edges
          color="black"
        />
      </mesh>
    )
  }