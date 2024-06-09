import React, { useRef, useMemo } from 'react';
import * as THREE from 'three'
import { Edges } from '@react-three/drei'

export const House = (props) => {

  const wallLength = 25;
  const floor = -0.5;
  const ceiling = 11;

    var wallNZGeo = useMemo( () => {
    let wallNZ = new THREE.Shape();
    wallNZ.moveTo(-wallLength, floor);
    wallNZ.lineTo(wallLength, floor);
    wallNZ.lineTo(wallLength, ceiling);
    wallNZ.lineTo(-wallLength, ceiling);

    var hole = new THREE.Shape();
    hole.moveTo(-4, floor);
    hole.lineTo(4, floor);
    hole.lineTo(4, 4);
    hole.bezierCurveTo(4, 6.25, 2.25, 8, 0, 8);
    hole.bezierCurveTo(-2.25, 8, -4, 6.25, -4, 4);
    hole.lineTo(-4, floor);

    wallNZ.holes.push( hole );  

    return wallNZ
    }, []
    )
    
    let sidesGeo = useMemo( () => {
      var wallPZ = new THREE.Shape();
      wallPZ.moveTo(-wallLength, floor);
      wallPZ.lineTo(wallLength, floor);
      wallPZ.lineTo(wallLength, ceiling);
      wallPZ.lineTo(-wallLength, ceiling);
  
      let windowX = 0;
      let windowY = 5;
      let windowR = 2;  
      let windowL = wallLength*0.88;   
  
      var holePZ = new THREE.Shape();
      holePZ.moveTo(windowX + windowL, windowY + windowR);
      holePZ.bezierCurveTo(windowX + windowL + windowR/2, windowY + windowR, windowX+windowL+windowR, windowY+windowR/2, windowX+windowL+windowR, windowY);
      holePZ.bezierCurveTo(windowX+windowL+windowR, windowY-windowR/2, windowX+windowL+windowR/2, windowY-windowR, windowX+windowL, windowY-windowR);
      holePZ.lineTo(windowX - windowL, windowY - windowR);
      holePZ.bezierCurveTo(windowX-windowL-windowR/2, windowY-windowR, windowX-windowL-windowR, windowY-windowR/2, windowX-windowL-windowR, windowY);
      holePZ.bezierCurveTo(windowX-windowL-windowR, windowY+windowR/2, windowX-windowL-windowR/2, windowY+windowR, windowX-windowL, windowY+windowR);
  
      wallPZ.holes.push( holePZ ); 
      
      return wallPZ
      }, []
    )

    let extrusion = useMemo( () => {
      var extrudeSettings = { 
        depth: .5, 
        curveSegments: 150,
        bevelEnabled: false, 
        bevelSegments: 2, 
        steps: 2, 
        bevelSize: 1, 
        bevelThickness: 1 
      };
      return extrudeSettings
      }, []
    )
    
    
    function House() {

      const ref = useRef()

      return (
        <>

          <mesh
          castShadow
          receiveShadow
          position={[0, 0, -wallLength]}
          >
            <extrudeGeometry args={[wallNZGeo, extrusion]}/>
            <meshStandardMaterial color="white"/>
            <Edges color="black"/>
          </mesh>

          <mesh
          castShadow
          receiveShadow
          position={[wallLength, 0, 0]}
          rotation={[0, Math.PI/2, 0]}
          >
            <extrudeGeometry args={[sidesGeo, extrusion]}/>
            <meshStandardMaterial color="white"/>
            <Edges color="black"/>
          </mesh>

          <mesh
          castShadow
          receiveShadow
          position={[-wallLength, 0, 0]}
          rotation={[0, -Math.PI/2, 0]}
          >
            <extrudeGeometry args={[sidesGeo, extrusion]}/>
            <meshStandardMaterial color="white"/>
            <Edges color="black"/>
          </mesh>

          <mesh
          castShadow
          receiveShadow
          position={[0, 0, wallLength*.98]}
          >
            <extrudeGeometry args={[sidesGeo, extrusion]}/>
            <meshStandardMaterial color="white"/>
            <Edges color="black"/>
          </mesh>

        </>
      
      )

    }

    return (
      <House />
    )

}