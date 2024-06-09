import React, { useState, useRef, useMemo } from 'react';
import * as THREE from 'three'
import { Edges } from '@react-three/drei'

export const Wall = ({props, rotation, position, objects, order}) => {
    
  const [wallTexture, setWallTexture] = useState(new THREE.Texture());
        
  var imageTexture = useMemo( () => {    
        var rand = '?'+Math.random();

        var image = new Image();
        image.crossOrigin = "anonymous";
        image.src = objects[order].value.data.primaryImageSmall + rand;
        image.onload = function() { 

            let canvasElement = document.createElement('canvas');
            let textureCanvas = new THREE.CanvasTexture(canvasElement);
            let ctx = canvasElement.getContext('2d');
            canvasElement.width = image.width*1.5*(6/7);
            canvasElement.height = image.width*1.5;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
            ctx.fillStyle = "black";
            ctx.fillRect(((canvasElement.width - image.width)/2)*0.95, (((canvasElement.height - image.height)/2))*0.95, image.width*1.025, image.height*1.025);
            ctx.drawImage(image, ((canvasElement.width - image.width)/2), ((canvasElement.height - image.height)/2), image.width, image.height);
            setWallTexture(textureCanvas);

        };
        return wallTexture
    }, []
  )

  function WallGeo() {
    const ref = useRef()

    const wallMesh = useMemo( () => {

      return (
        <mesh
        {...props}
        ref={ref}
        position={position}
        rotation={rotation}
        castShadow
        >
        <boxGeometry args={[3, 3.5, 0.5]} />
        <meshBasicMaterial attach="material-0" color="white" /> 
        <meshBasicMaterial attach="material-1" color="white" /> 
        <meshBasicMaterial attach="material-2" color="white" /> 
        <meshBasicMaterial attach="material-3" color="white" />
        <meshBasicMaterial attach="material-4" map={wallTexture} /> 
        <meshBasicMaterial attach="material-5" color="white"/> 
        <Edges
          color="black"
        />
      </mesh>
      )
    }, []
    )

    return (
      wallMesh
    )
  }
      
    
  return (
    <WallGeo />
  )
}