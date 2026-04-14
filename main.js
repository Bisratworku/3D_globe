import *  as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {drawThreeGeo} from './geojson/threeGeoJSON.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
camera.position.z = 5;
fetch("geojson/countries.json")
.then(response => response.json())
.then(data => {
    const countries = drawThreeGeo({
        json: data,
        radius: 2.5,
        color : new THREE.Color().setHSL(0.33, 0.8, 0.5)
    }); 
    scene.add(countries);
    countries.rotation.z = 1550;
});
fetch("geojson/rivers.geojson")
.then(response => response.json())
.then(data => {
    const rivers = drawThreeGeo({
        json: data,
        radius: 2.5,
        color : new THREE.Color().setHSL(0.6, 1.0, 0.5)
    }); 

    scene.add(rivers);
    rivers.rotation.z = 1550;
});



function animate(time) {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize);