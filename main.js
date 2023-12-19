import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2, 2, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 80000000,
});
const parent_material = new THREE.MeshBasicMaterial({
  color: "#FFE4E1",
});
const cube = new THREE.Mesh(geometry, material);
const parent_cube = new THREE.Mesh(geometry, parent_material);
parent_cube.add(cube);

parent_cube.position.set(-5, 0, 0);
cube.scale.set(2, 2, 2);

cube.position.set(5, 0, 0);
scene.add(parent_cube);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const control = new OrbitControls(camera, renderer.domElement);

function animate() {
  control.update();
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
