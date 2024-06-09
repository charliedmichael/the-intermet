import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three'

export const SkySphere = (props) => {
    const ref = useRef()

    // useFrame((state, delta) => (
    //   ref.current.rotation.x += delta,
    //   ref.current.rotation.y += delta
    //   ))
  
    return (
      <mesh
        {...props}
        ref={ref}
        >
        <boxGeometry args={[500, 500, 500]} />
        <meshBasicMaterial color={'blue'} side={THREE.DoubleSide} />
     
      </mesh>
    )
  }