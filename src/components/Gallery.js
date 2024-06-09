import React, { useRef, useMemo } from 'react';
import * as THREE from 'three'
import { Html, Text } from '@react-three/drei'

import '../App.css';

import HelveticaLight from "../fonts/Akkurat-Mono.ttf"

import { Wall } from "./Wall";

export const Gallery = ({props, objects}) => {

    let radius = 15;

    let angle = 2 * Math.PI / 12;

    function rotAngle(id) {
        return (angle*id)
    }

    function WallAndLabel() {
        const textRef = useRef()

        const wallMap = useMemo( () => {



            return(
            objects.map((object, id) => {
                
                return (
                    <group key={id}>
                    <Wall order={id} rotation={[0, rotAngle(id), 0]} 
                    position={[-radius*Math.sin(id*angle), (4 + id*.75), -radius*Math.cos(id*angle)]} objects={objects} key={object.value.data.objectID} castShadow
                    />

                   

                    <Text
                    ref={textRef}
                    color="black"
                    fontWeight="bold"
                    fontSize="0.1"
                    font={HelveticaLight}
                    anchorX="center"
                    anchorY="top"
                    position={[-radius*Math.sin(id*angle), (1.75 + id*.75), -radius*Math.cos(id*angle)]}
                    rotation={[0, rotAngle(id), 0]}
                    maxWidth="2"
                    style={{backgroundColor: "white"}}
                    >

  
                            {objects[id].value.data.title}
                            {"\n"}
                            {objects[id].value.data.objectDate}
                            {"\n"}
                            {objects[id].value.data.medium}


                    </Text>

                    

                    <mesh
                        position={[
                            -(radius*1.001)*Math.sin(id*angle), 
                            (       
                                1.575 + id*.75
                                -
                                (
                                    Math.floor(objects[id].value.data.medium.length/31)
                                    *0.1
                                )/2 
                                -
                                (
                                    Math.floor(objects[id].value.data.title.length/31)
                                    *0.1
                                )/2 
                                -
                                (
                                    Math.floor(objects[id].value.data.objectDate.length/31)
                                    *0.1
                                )/2 

                
                            ), 
                            -(radius*1.001)*Math.cos(id*angle)
                        ]}
                        rotation={[0, rotAngle(id), 0]}
                    
                    >
                        <planeGeometry args={[  Math.min(
                                                Math.max(
                                                (objects[id].value.data.title.length/14.25), 
                                                (objects[id].value.data.medium.length/13),
                                                (objects[id].value.data.objectDate.length/13)

                                                ), 2.25), 
                                                (

                                                    .55
                                                    +
                                                    (
                                                        Math.floor(objects[id].value.data.medium.length/31)
                                                        *0.1
                                                    ) 
                                                    +
                                                    (
                                                        Math.floor(objects[id].value.data.title.length/31)
                                                        *0.1
                                                    )
                                                    +
                                                    (
                                                        Math.floor(objects[id].value.data.objectDate.length/31)
                                                        *0.1
                                                    )
                                                    
                                                )  
                                                ]} />

                        <meshBasicMaterial color="white" side={THREE.DoubleSide}/>
                    </mesh>
                    </group>
                )
            }) 
            )
        }, []
        )

        return (
            wallMap
        )
    }

    return (
    <> 
        <WallAndLabel />

       


        {objects.length>1?
        <Html
        castShadow
        occlude
        zIndexRange={[1, 0]} 
        transform
        scale={0.125}
        position={[5.5, 5, -24.4]}
        >
            <div class='sign'>
                <div class='signTitle'>
                    {objects[0].value.data.artistDisplayName}

                </div>

                <div>
                    <div class='signInfo'>
                        {objects[0].value.data.artistNationality}

                    </div>
                </div>
                <div class={objects[0].value.data.artistBeginDate? 'signGroup' : 'hide'}>
                    <div class='signInfo'>
                        Born
                    </div>
                    <div class='signInfo'>
                        {objects[0].value.data.artistBeginDate}

                    </div>
            
                </div>

                <div class={objects[0].value.data.artistEndDate? 'signGroup' : 'hide'}>
                    <div class='signInfo'>
                        Died
                    </div>
                    <div class='signInfo'>
                            {objects[0].value.data.artistEndDate}

                    </div>
                </div>
                
            </div>
        </Html>
        : null }

    </>
    )
}
