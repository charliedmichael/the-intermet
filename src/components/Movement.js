import { Vector3, Raycaster } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let moveUp = false;
let moveDown = false;

const cObjects = []; 

const velocity = new Vector3();
const direction = new Vector3();
const xyVector = new Vector3(0, 1, 0);
const wDirection = new Vector3();

let raycaster;
let cameraDirection = new THREE.Vector3();

export default function Movement( {objects} ) {

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


        }

    };

    document.addEventListener( 'keydown', onKeyDown );
    document.addEventListener( 'keyup', onKeyUp );

    raycaster = new Raycaster( new Vector3(), new Vector3( 0, - 1, 0 ), 0, 4 );

    const cSpeed = 10;

    const _vector = new Vector3()

    const walkForward = function (distance) {

        _vector.setFromMatrixColumn(camera.matrix, 0)
        _vector.crossVectors(camera.up, _vector)
        _vector.y = camera.getWorldDirection(cameraDirection).y
        _vector.x = camera.getWorldDirection(cameraDirection).x
        _vector.z = camera.getWorldDirection(cameraDirection).z

        camera.position.addScaledVector(_vector, distance)
    }

    const walkRight = function (distance) {
        _vector.setFromMatrixColumn(camera.matrix, 0)
  
        camera.position.addScaledVector(_vector, distance)
    }

    const walkUp = function (distance) {
  
        camera.position.addScaledVector(xyVector, distance)
    }

    let boxSize = 24;

    useFrame(({ camera }, delta) => {

            raycaster.ray.origin.copy( camera.position );
            raycaster.ray.origin.y -= camera.position.y;

            const intersections = raycaster.intersectObjects( cObjects );

            const onObject = intersections.length > 0;

            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            velocity.y -= velocity.y * 10.0 * delta;


            direction.z = Number( moveForward ) - Number( moveBackward );
            direction.x = Number( moveRight ) - Number( moveLeft );
            
            direction.y = Number( moveUp ) - Number( moveDown );

            direction.normalize(); 

            if ( moveForward || moveBackward ) velocity.z -= direction.z * cSpeed * delta;
            if ( moveLeft || moveRight ) velocity.x -= direction.x * cSpeed * delta;

            if ( moveUp || moveDown ) velocity.y -= direction.y * cSpeed * delta;

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
