import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three'
import { useLoader, useThree } from '@react-three/fiber'
import { CubeTextureLoader } from "three"; // highlight-line


import left     from '../assets/Cubemap-2-01.png';
import right    from '../assets/Cubemap-2-02.png';
import up       from '../assets/Cubemap-2-03.png';
import down     from '../assets/Cubemap-2-04.png';
import front    from '../assets/Cubemap-2-05.png';
import back     from '../assets/Cubemap-2-06.png';

export const Sky = (props) => {

    // let bgMaterial = [];
    let texture_lf = new THREE.TextureLoader().load( left );
    let texture_rt = new THREE.TextureLoader().load( right );
    let texture_up = new THREE.TextureLoader().load( up );
    let texture_dn = new THREE.TextureLoader().load( down );
    let texture_ft = new THREE.TextureLoader().load( front );
    let texture_bk = new THREE.TextureLoader().load( back );
      
//   const { scene } = useThree();
//   const loader = new CubeTextureLoader();

  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.

//   const texture = loader.load([
//       bluecloud_bk,
//       bluecloud_dn,
//       bluecloud_ft,
//       bluecloud_lf,
//       bluecloud_rt,
//       bluecloud_up,
//   ]);

// Set the scene background property to the resulting texture.

//   scene.background = texture;


    const ref = useRef()
    
    function Sky(props) {
        const ref = useRef()
      
        return (
          <mesh
          {...props}
          ref={ref}
          >
            <boxGeometry args={[2000, 2000, 2000]}/>
            <meshBasicMaterial attach="material-0" map={texture_rt} side={THREE.DoubleSide}/> 
            <meshBasicMaterial attach="material-1" map={texture_lf} side={THREE.DoubleSide}/> 
            <meshBasicMaterial attach="material-2" map={texture_up} side={THREE.DoubleSide}/> 
            <meshBasicMaterial attach="material-3" map={texture_dn} side={THREE.DoubleSide}/> 
            <meshBasicMaterial attach="material-4" map={texture_ft} side={THREE.DoubleSide}/> 
            <meshBasicMaterial attach="material-5" map={texture_bk} side={THREE.DoubleSide}/> 

          </mesh>
        )
    }

    return (
      <Sky />
      )

}