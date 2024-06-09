import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Sky } from '@react-three/drei'

export const MySky = (props) => {
    
    var clock = new THREE.Clock();
    var sunX;
    var sunZ;

    const ref = useRef()
    // useFrame((state, delta) => (
    //     sunX = delta
    // ))

    // ref.current.sunPosition = (0, 200, 100)
    
    function MySky(props) {
      
        return (

            <Sky            
            {...props}
            ref={ref}
            sunPosition={[0, 200, 100]} 
            distance={450000} inclination={0} azimuth={0.75}  />

        )
    }

    return (
      <MySky />
      )

}