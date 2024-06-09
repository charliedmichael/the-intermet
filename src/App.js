import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, PointerLockControls, Cloud, Clouds } from '@react-three/drei'
import axios from 'axios';

import './App.css';

import { SearchBar } from "./components/SearchBar";
import { Gallery } from "./components/Gallery";
import Movement from "./components/Movement"
import { House } from "./components/House"
import { NewSky } from "./components/NewSky";
import { Palm } from "./components/Palm"


function App() {

const [objects, setObjects] = useState([]);
const [objectIDList, setObjectIDList] = useState([]);
const [searchValue, setSearchValue] = useState('Van Gogh');
const [showInstructions, setShowInstructions] = useState(true)
const [noImages, setNoImages] = useState(false);

const cloudSpeed = 0.1;

function pointerlockchange() {
    setShowInstructions(!showInstructions)
}

useEffect(() => {
    document.addEventListener('pointerlockchange', pointerlockchange, false)
    return () => {
        document.removeEventListener('pointerlockchange', pointerlockchange, false)
    }
})

const baseURL = "https://collectionapi.metmuseum.org/public/collection/v1";

useEffect( () => {
  console.log(searchValue)
  let value = searchValue.toLowerCase();
  fetchData(value);
}, [searchValue]);

const fetchData = async (value) => {
  const response = await axios.get(`${baseURL}/search?artistOrCulture=true&q=${value}`)
  setObjectIDList(response.data.objectIDs)
  return await response.data.objectIDs
  
};

function getAllObjects(IDList) {
  return Promise.allSettled(IDList.map(grabObject))
}

function grabObject(objectID) {
  return axios
      .get(`${baseURL}/objects/${objectID}`)
      .then(function(response) {  
          return {
            success: true,
            data: response.data
          };
      })
      .catch(function(error) {
          return { success: false };
      })
}    

useEffect( () => {
  console.log(objectIDList)
  if (objectIDList && objectIDList.length > 0) {
    getAllObjects(objectIDList).then(resp=>{
      let filterObjects = resp.filter((object) => 
      object.value.success 
      && object.value.data.primaryImageSmall.length > 0
      && object.value.data.artistDisplayName
      // && object.value.data.artistDisplayName.normalize('NFD').toLowerCase().includes(searchValue.toLowerCase())
      );
      setObjects(filterObjects)
      setNoImages(false)
      console.log(objects)
    }).catch(e=>{console.log(e)})
  }
  else {
    setNoImages(true);
    console.log('error')
  }
}, [objectIDList])


function Floor(props) {
  const ref = useRef()

  var size = 21;
  var scale = size*16;

  var canvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d');
  canvas.width = scale;
  canvas.height = scale;
  
  ctx.lineWidth = 8;
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.rect(0, 0, scale, scale);
  ctx.fill();
  ctx.stroke();

  var texture = new THREE.Texture(canvas);
  texture.repeat.set( 100, 100 ); // CHANGE THIS FOR CHECKER SIZE
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  return (
    <mesh 
    {...props}
    ref={ref}
    rotation-x={Math.PI / 2}
    position={[0, 0, 0]}
    >
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial attach="material" map={texture} side={THREE.DoubleSide} />

    </mesh>
  )
}

  function Light() {


    return (

      <spotLight 
        decay={0.05}
        castShadow
        shadow-radius={0.2}
        shadow-bias={-0.001} 
        shadow-mapSize={[1024, 1024]}
        position={[0, 40, 0]} 
        intensity={3.5} 
        color="#fff" />

    )
  }


  return (
    
    <div className="screen"> 
     
     <div className={showInstructions ? 'UI' : 'hide'}>
        <div className ="nav">
          
          <div>
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} objectIDList={objectIDList} setObjectIDList={setObjectIDList} objects={objects} setObjects={setObjects} />
          </div>

          <div className="results">
            <div>
              {noImages? 'NO IMAGES' : 'NOW SHOWING' }
              {/* NOW SHOWING */}
            </div>
            <div>
              {searchValue}&nbsp;({objects.length})
            </div>
           
          </div>

          <div>
            <button id="explore">EXPLORE&rarr;</button>
          </div>

        </div>

        <div className="main-container">
          <div className="title">The InterMet</div>
          <div className="subtitle">
            The Met on the Internet
          </div>
          <div className="body">
            Welcome to a virtual gallery of the Metropolitan Museum of Art's open access artwork&#8212;a collection 
            of 5,000 years of art from around the world. Over 470,000 pieces are available to view
            in the gallery, just type something into the search to see what the Met has to show.
            Need ideas? Try basic old school names like Mary, John, Jean, James, Henri, Paul, Charles, or Pierre.
            Or just try the name of a country, region, or culture, like France, Japan, Africa or Inca.
          </div>
        </div>

      </div>

      <div className={!showInstructions ? 'controls' : 'hide'}>
        <div className="controlsTitle">
          <div>C</div><div>O</div><div>N</div><div>T</div><div>R</div><div>O</div><div>L</div><div>S</div>  
        </div>
        <div className="controlsRow">&nbsp;</div>
        <div className="controlsRow">
            <div>
              <div>W</div>
              <div>Forward</div>
            </div>
            <div>
              <div>S</div>
              <div>Backward</div>
            </div>
            <div>
              <div>A</div>
              <div>Left</div>
            </div>
            <div>
              <div>D</div>
              <div>Right</div>
            </div>
            <div>
              <div>E</div>
              <div>Up</div>
            </div>
            <div>
              <div>C</div>
              <div>Down</div>
            </div>
          </div>
      </div>

      <Canvas flat linear 
      shadows={{ type: "THREE.VSMShadowMap" }}
      >
       
        <PerspectiveCamera makeDefault position={[0, 4, 0]} rotation={[0, 0, 0]}/>
        {!showInstructions? <Movement objects={objects}/> : null }
        <PointerLockControls 
        selector="#explore" 
        />
        <ambientLight intensity={1.25} />

        <Light />

        <Gallery objects={objects} />
        <House />
        <NewSky />
       
        <Clouds frustumCulled={false} material={THREE.MeshBasicMaterial}>
          <Cloud bounds={[50, 5, 50]} smallestVolume={1.5} volume={50} seed={0} position={[0, -50, -100]} color="#ffffff" speed={cloudSpeed} opacity={1} />
          <Cloud bounds={[50, 5, 50]} smallestVolume={1.5} volume={50} seed={0} position={[0, -50, 100]} color="#ffffff" speed={cloudSpeed} opacity={1} />
          <Cloud bounds={[50, 5, 50]} smallestVolume={1.5} volume={50} seed={0} position={[100, -50, 0]} color="#ffffff" speed={cloudSpeed} opacity={1} />
          <Cloud bounds={[50, 5, 50]} smallestVolume={1.5} volume={50} seed={0} position={[-100, -50, 0]} color="#ffffff" speed={cloudSpeed} opacity={1} />

          <Cloud bounds={[50, 5, 50]} smallestVolume={2} volume={50} seed={0} position={[0, -20, -200]} color="#ffffff" speed={cloudSpeed} opacity={1} />
          <Cloud bounds={[50, 5, 50]} smallestVolume={2} volume={50} seed={0} position={[200, -20, 0]} color="#ffffff" speed={cloudSpeed} opacity={1} />
        
          <Cloud bounds={[50, 5, 50]} smallestVolume={2} volume={50} seed={0} position={[100, -10, -100]} color="#ffffff" speed={cloudSpeed} opacity={1} />
          <Cloud bounds={[50, 5, 50]} smallestVolume={2} volume={50} seed={0} position={[100, -10, 100]} color="#ffffff" speed={cloudSpeed} opacity={1} />
          <Cloud bounds={[75, 5, 75]} smallestVolume={3} volume={75} seed={0} position={[-150, -10, 150]} color="#ffffff" speed={cloudSpeed} opacity={1} />
          <Cloud bounds={[50, 5, 50]} smallestVolume={2} volume={50} seed={0} position={[-100, -10, -100]} color="#ffffff" speed={cloudSpeed} opacity={1} />
        </Clouds>
        <Floor receiveShadow/>
        <Palm/>
        
      </Canvas>
      

    </div>

  )
}

export default App;

