import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three'
import { Edges } from '@react-three/drei'

export const Stairs = ({props, rotation, position, objects, order}) => {
    
    // const [wallTexture, setWallTexture] = useState(new THREE.Texture());
        
    // var rand = '?'+Math.random();

    // var image = new Image();
    // image.crossOrigin = "anonymous";
    // image.src = objects[order].value.data.primaryImageSmall + rand;
    // image.onload = function() { 

    //     let canvasElement = document.createElement('canvas');
    //     let textureCanvas = new THREE.CanvasTexture(canvasElement);
    //     let ctx = canvasElement.getContext('2d');
    //     canvasElement.width = image.width*1.5*(6/7);
    //     canvasElement.height = image.width*1.5;
    //     ctx.fillStyle = "white";
    //     ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    //     ctx.fillStyle = "black";
    //     ctx.fillRect(((canvasElement.width - image.width)/2)*0.95, (((canvasElement.height - image.height)/2))*0.95, image.width*1.025, image.height*1.025);
    //     ctx.drawImage(image, ((canvasElement.width - image.width)/2), ((canvasElement.height - image.height)/2), image.width, image.height);
    //     setWallTexture(textureCanvas);

    // };

    // let radius = objects.length/1.8;
    // if(radius < 5) {
    //     radius = 5
    // }
    let radius = 13;

    // let angle = 2 * Math.PI / objects.length;
    let angle = 2 * Math.PI / 12;

    function rotAngle(id) {
        return -(angle*id)-Math.PI/2
    }

    // let count = objects.length; 
    // let temp = new THREE.Object3D();
    // let bbox = [];

    // const instancedMeshRef = useRef()
    // useEffect(() => {
    //     // Set positions
    //     bbox = [];
    //     for (let i = 0; i < count; i++) {
    //     temp.position.set(radius*Math.cos(i*angle), (i*.75), radius*Math.sin(i*angle))
    //     temp.rotation.set(0, rotAngle(i), 0)
    //     temp.updateMatrix()
    //     instancedMeshRef.current.setMatrixAt(i, temp.matrix)
    //     instancedMeshRef.current.frustumCulled = false
    //     bbox.push(new THREE.Box3().setFromObject(instancedMeshRef.current))
    //     }
    //     // Update the instance
    //     instancedMeshRef.current.instanceMatrix.needsUpdate = true
    //     console.log(instancedMeshRef.current)
    // }, [objects])

    function Stair(props) {
        const ref = useRef()
      
        return (
          <mesh
          {...props}
          ref={ref}
          >
            <cylinderGeometry args={[4, 4, 0.5]}/>
            <meshPhysicalMaterial attach="material" color="white" side={THREE.DoubleSide} roughness="0" transmission="0.75" thickness="0.5"/>
      
          </mesh>
        )
      }

    return (
        <>
        {
            objects.map((object, id) => {
                return (<group key={id}>
                <Stair order={id} rotation={[0, rotAngle(id), 0]} position={[radius*Math.cos(id*angle), (id*.75), radius*Math.sin(id*angle)]} objects={objects} key={object.value.data.objectID} />
  
                </group>
                )
            })
        }
        </>
    )
      

  }