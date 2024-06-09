import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three'
import { CubeTextureLoader } from "three"; // highlight-line
import { useLoader, useThree } from '@react-three/fiber'

import bluecloud_bk from '../assets/bluecloud_bk.jpeg';
import bluecloud_dn from '../assets/bluecloud_dn.jpeg';
import bluecloud_ft from '../assets/bluecloud_ft.jpeg';
import bluecloud_lf from '../assets/bluecloud_lf.jpeg';
import bluecloud_rt from '../assets/bluecloud_rt.jpeg';
import bluecloud_up from '../assets/bluecloud_up.jpeg';

export const SkyBox = (props) => {

    // const { scene } = useThree();
    const loader = new CubeTextureLoader();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  
    // const texture = loader.load([
    //     bluecloud_bk,
    //     bluecloud_dn,
    //     bluecloud_ft,
    //     bluecloud_lf,
    //     bluecloud_rt,
    //     bluecloud_up,
    // ]);

  // Set the scene background property to the resulting texture.

//   scene.background = texture;

    return (
      <SkyBox />
      )

}