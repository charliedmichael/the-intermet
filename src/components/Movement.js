import { useRef, useEffect, useMemo } from 'react'
import { Vector3, Raycaster } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
// let canJump = false;
// let crouch = false;

let moveUp = false;
let moveDown = false;

const cObjects = []; 

const velocity = new Vector3();
const direction = new Vector3();
const xyVector = new Vector3(0, 1, 0);
const wDirection = new Vector3();

let raycaster;

// let camFoot = new Vector3();

export default function Movement( {objects} ) {

    // let bbox = [];

    // const stairGeo = new THREE.CylinderGeometry(4, 4, 0.5)
    // const stairMat = new THREE.MeshBasicMaterial()
    // const stairMesh = new THREE.Mesh(stairGeo, stairMat)

    // let radius = 13;

    // let angle = 2 * Math.PI / 12;

    // function rotAngle(id) {
    //     return -(angle*id)-Math.PI/2
    // }

    // const camGeo = new THREE.BoxGeometry(1,4,1)
    // const camMat = new THREE.MeshBasicMaterial()
    // const camMesh = new THREE.Mesh(camGeo, camMat)
    // camMesh.geometry.computeBoundingBox()
    // const camBox = new THREE.Box3()
    
    // useEffect(() => {

    //     objects.map((object, id) => {
    //         stairMesh.position.set(radius*Math.cos(id*angle), (id*.75), radius*Math.sin(id*angle))
    //         stairMesh.rotation.set(0, rotAngle(id), 0)
    //         bbox.push(new THREE.Box3().setFromObject(stairMesh))
    //         // console.log(bbox[id])
    //     })
    // }, [objects])

    // objects.map((object, id) => {
    //     stairMesh.position.set(radius*Math.cos(id*angle), (id*.75), radius*Math.sin(id*angle))
    //     stairMesh.rotation.set(0, rotAngle(id), 0)
    //     bbox.push(new THREE.Box3().setFromObject(stairMesh))
    //     console.log(bbox[id])
    // })

    // console.log(bbox)

    const { camera } = useThree()

    const onKeyDown = function ( event ) {

        switch ( event.code ) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;

            case 'KeyE':
            case 'Slash':
                moveUp = true;
                break;

            case 'KeyC':
            case 'Period':
                moveDown = true;
                break;

            // case 'Space':
            //     if ( canJump === true ) velocity.y += 200;
            //     canJump = false;
            //     break;

            // case 'KeyZ':
            //     crouch = true;
            //     break;

        }

    };

    const onKeyUp = function ( event ) {

        switch ( event.code ) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;

            case 'KeyE':
            case 'Slash':
                moveUp = false;
                break;
    
            case 'KeyC':
            case 'Period':
                moveDown = false;
                break;

            // case 'KeyZ':
            //     crouch = false;
            //     break;

        }

    };

    document.addEventListener( 'keydown', onKeyDown );
    document.addEventListener( 'keyup', onKeyUp );

    raycaster = new Raycaster( new Vector3(), new Vector3( 0, - 1, 0 ), 0, 4 );

    const cSpeed = 10;
    // const mass = 100.0;
    // const jumpSpeed = 0.1;
    // const crouchDist = 2.5;
    const _vector = new Vector3()

    const walkForward = function (distance) {
        // move forward parallel to the xz-plane
        // assumes camera.up is y-up
  
        _vector.setFromMatrixColumn(camera.matrix, 0)
  
        _vector.crossVectors(camera.up, _vector)
  
        camera.position.addScaledVector(_vector, distance)
    }

    const walkRight = function (distance) {
        _vector.setFromMatrixColumn(camera.matrix, 0)
  
        camera.position.addScaledVector(_vector, distance)
    }

    const walkUp = function (distance) {
        _vector.setFromMatrixColumn(camera.matrix, 0)

        console.log(_vector)

        // console.log(camera.up)

        // camera.getWorldDirection(wDirection)
        // if(wDirection.x > 0){
        //     xyVector.set(-1, 0, 0)

        // }
        // else{
        //     xyVector.set(1, 0, 0)
        // }

        // _vector.crossVectors(xyVector, _vector)

  
        camera.position.addScaledVector(xyVector, distance)
    }

    let boxSize = 24;

    useFrame(({ camera }, delta) => {

            // camMesh.position.set(camera.position);
            // camBox.copy( camMesh.geometry.boundingBox ).applyMatrix4( camMesh.matrixWorld );
            // camBox.setFromObject(camMesh)
            // console.log(camBox)

            // camFoot.copy(camera.position)
            // camFoot.y -= 4

            // console.log(bbox[0].containsPoint(camFoot))
            // console.log(camFoot)

            // if(bbox[0].containsPoint(camFoot)) {
            //     camera.position.y = 4 + bbox[0].max.y
            // }
            // else {
            //     camera.position.y = 4
            // }
            // console.log(camera.position.add(0, -4, 0))

            raycaster.ray.origin.copy( camera.position );
            raycaster.ray.origin.y -= camera.position.y;

            const intersections = raycaster.intersectObjects( cObjects );

            const onObject = intersections.length > 0;

            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            // velocity.y -= 9.8 * mass * delta; 

            velocity.y -= velocity.y * 10.0 * delta;


            direction.z = Number( moveForward ) - Number( moveBackward );
            direction.x = Number( moveRight ) - Number( moveLeft );
            
            direction.y = Number( moveUp ) - Number( moveDown );

            direction.normalize(); 

            if ( moveForward || moveBackward ) velocity.z -= direction.z * cSpeed * delta;
            if ( moveLeft || moveRight ) velocity.x -= direction.x * cSpeed * delta;

            if ( moveUp || moveDown ) velocity.y -= direction.y * cSpeed * delta;

            // if ( onObject === true ) {

            //     velocity.y = Math.max( 0, velocity.y );
            //     canJump = true;

            // }

            walkForward(- velocity.z * delta * cSpeed )
            walkRight( - velocity.x * delta * cSpeed )

            walkUp( - velocity.y * delta * cSpeed )

            if(camera.position.y < 1){
                camera.position.y = 1
            }

            if(camera.position.x < -boxSize){
                camera.position.x = -boxSize
            }

            if(camera.position.x > boxSize){
                camera.position.x = boxSize
            }

            if(camera.position.z > boxSize){
                camera.position.z = boxSize
            }

            if(camera.position.z < -boxSize){
                camera.position.z = -boxSize
            }

    })

}
