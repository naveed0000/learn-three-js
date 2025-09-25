import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let loader = new THREE.TextureLoader();
loader.load("textures/uv_grid_opengl.jpg", function (texture) {
  scene.background = texture;
});

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'red', });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;
const edges = new THREE.EdgesGeometry( geometry ); 

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
document.body.appendChild(renderer.domElement);
  

const highIntensityLight = new THREE.DirectionalLight(0xffffff, 10);
highIntensityLight.position.set(10, 10, 5);
scene.add(highIntensityLight);
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  // when ever you change camera aspect ratio you need to update the projection matrix
  camera.aspect = window.innerWidth / window.innerHeight; 
  camera.updateProjectionMatrix();
});



const controls = new OrbitControls(camera, renderer.domElement);
function animate() {
  window.requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
