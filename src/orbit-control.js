import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "green",
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  //camera.aspect ::  when ever you change camera aspect ratio you need to update the projection matrix
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // for smooth transition
controls.autoRotate = false; // auto rotate
controls.enableZoom = true; // disable panning
controls.dampingFactor = 0.03; // damping inertia
// controls.autoRotateSpeed = 15; // auto rotate speed

function animate() {
  window.requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();
