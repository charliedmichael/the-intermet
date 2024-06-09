import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { Edges, Html } from '@react-three/drei'

export const Label = ({props, objects, order}) => {
    
    const [displayTexture, setDisplayTexture] = useState(new THREE.Texture());
        
    var rand = '?'+Math.random();

    let string = objects[order].value.data.title;
    // console.log(string)

    // useEffect( () => {
    //   let canvasElement = document.createElement('canvas');
    //   let textureCanvas = new THREE.CanvasTexture(canvasElement);
    //   let ctx = canvasElement.getContext('2d');
    //   canvasElement.width = 100;
    //   canvasElement.height = 100;
    //   ctx.fillStyle = "white";
    //   ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    //   ctx.font = '12px serif'
    //   ctx.fillStyle = "black";
    //   ctx.textAlign = 'center';
    //   ctx.textBaseline = 'middle';
    //   ctx.fillText(string, canvasElement.width / 2, canvasElement.height / 2)
    //   // textureCanvas.needsUpdate = true;
    //   setDisplayTexture(textureCanvas);

    //   let display = new THREE.Texture(canvasElement);    
    // }, [objects])

    const ref = useRef()
    
    return (
    <Html
    {...props}
    transform
    // occlude
    geometry={
        <planeGeometry args={[1.5, 0.5, 0.25]}/>
    }
    >
        <div>
        HELLO
        </div>
    </Html>
    )
  }