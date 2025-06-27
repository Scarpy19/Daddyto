import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);


const loader = new THREE.TextureLoader();
loader.setPath('textures/dice/');

const material = [
    new THREE.MeshBasicMaterial(
    {
        map: loader.load('dice6.png')
    }), //Derecha
    new THREE.MeshBasicMaterial(
    {
        map: loader.load('dice5.png')
    }), //Izquierda
    new THREE.MeshBasicMaterial(
    {
        map: loader.load('dice4.png')
    }), //Arriba
    new THREE.MeshBasicMaterial(
    {
        map: loader.load('dice2.png')
    }), //Abajo
    new THREE.MeshBasicMaterial(
    {
        map: loader.load('dice1.png')
    }), //Frente
    new THREE.MeshBasicMaterial(
    {
        map: loader.load('dice3.png')
    }) //Trasera
];

// load a texture, set wrap mode to repeat
/* const textureCube = new THREE.TextureLoader().load("textures/dice/dice2.png");

textureCube.wrapS = THREE.RepeatWrapping;
textureCube.wrapT = THREE.RepeatWrapping;
// textureCube.magFilter = THREE.NearestFilter;
// textureCube.minFilter = THREE.NearestFilter; 
textureCube.anisotropy = 64;
textureCube.repeat.set(1, 1);

const material = new THREE.MeshBasicMaterial(
{
    color: 0xffffff,
    envMap: textureCube
}); */

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 3;
cube.rotation.x = Math.PI * 0.25;
cube.rotation.y = Math.PI * 0.25;

function animate()
{

    cube.rotation.x += Math.PI * 0.002;
    cube.rotation.y += Math.PI * 0.002;

    renderer.render(scene, camera);

}