import * as THREE from 'three';

let scene, camera, renderer, cube, controls;
let mouseX = 0,
    mouseY = 0;
let isMouseDown = false;
let targetRotationX = 0,
    targetRotationY = 0;
let currentRotationX = 0,
    currentRotationY = 0;

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    // Renderer
    renderer = new THREE.WebGLRenderer(
        {
            antialias: true,
            alpha: true
        });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // renderer.setAnimationLoop(animate);
    document.getElementById('app').appendChild(renderer.domElement);

    crearDado();

    Luces();

    addEventListeners();
}

function crearDado() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Create an array of textures for each face
    const textureLoader = new THREE.TextureLoader();
    const materials = [];

    // Load textures for each face (1-6)
    for (let i = 1; i <= 6; i++) {
        const texture = textureLoader.load(`textures/dice/dice${i}.png`);
        materials.push(new THREE.MeshStandardMaterial({
            map: texture
        }));
    }

    // Create the cube with the materials array
    cube = new THREE.Mesh(geometry, materials);
    cube.rotation.x = Math.PI * 0.25;
    cube.rotation.y = Math.PI * 0.25;
    cube.castShadow = true;
    cube.receiveShadow = true;

    animate();

    scene.add(cube);
}

function Luces() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);
}

function animate() {
    requestAnimationFrame(animate);
    console.log('Value for isMouseDown: ' + isMouseDown);

    // Suavizar rotación
    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;



    // Pequeña rotación automática cuando no se está interactuando
    if (!isMouseDown) {
        // console.log('rotando');
        cube.rotation.x += 0.002;
        cube.rotation.y += 0.002;
    } else {
        cube.rotation.x = currentRotationX;
        cube.rotation.y = currentRotationY;
    }

    renderer.render(scene, camera);
}

function addEventListeners() {
    // Mouse events
    renderer.domElement.addEventListener('mousedown', onMouseDown, false);
    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    renderer.domElement.addEventListener('mouseup', onMouseUp, false);
    renderer.domElement.addEventListener('wheel', onMouseWheel, false);

    // Touch events para móviles
    renderer.domElement.addEventListener('touchstart', onTouchStart, false);
    renderer.domElement.addEventListener('touchmove', onTouchMove, false);
    renderer.domElement.addEventListener('touchend', onTouchEnd, false);

    // Resize
    window.addEventListener('resize', onWindowResize, false);
}

function onMouseDown(event) {
    isMouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onMouseMove(event) {
    if (!isMouseDown) return;

    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;

    targetRotationY += deltaX * 0.01;
    targetRotationX += deltaY * 0.01;

    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onMouseUp() {
    isMouseDown = false;
}

function onMouseWheel(event) {
    camera.position.z += event.deltaY * 0.005;
    camera.position.z = Math.max(2, Math.min(10, camera.position.z));
}

function onTouchStart(event) {
    console.log(event);
    if (event.touches.length === 1) {
        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
        isMouseDown = true;
    }
}

function onTouchMove(event) {
    if (event.touches.length === 1 && isMouseDown) {
        const deltaX = event.touches[0].clientX - mouseX;
        const deltaY = event.touches[0].clientY - mouseY;

        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;

        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
    }
}

function onTouchEnd() {
    isMouseDown = false;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function rollDice() {
    // Animación de tirada de dado
    const randomRotationX = Math.random() * Math.PI * 4 + Math.PI * 2;
    const randomRotationY = Math.random() * Math.PI * 4 + Math.PI * 2;
    const randomRotationZ = Math.random() * Math.PI * 4 + Math.PI * 2;

    targetRotationX += randomRotationX;
    targetRotationY += randomRotationY;

    // Agregar rotación en Z para más efecto
    cube.rotation.z += randomRotationZ;
}

function resetView() {
    targetRotationX = 0;
    targetRotationY = 0;
    camera.position.z = 5;
}

init();
// window.addEventListener('resize', init, false);