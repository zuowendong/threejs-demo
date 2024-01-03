import * as THREE from "three";
import { baseThree } from "./base";
import { helper } from "./helper";
import { createGUI } from "./gui";

const baseParams = baseThree();
const { scene, camera, renderer } = baseParams;

const geometry = new THREE.BoxGeometry(1, 1, 1);
function rainbowMaterial(colors) {
  let _arr = [];
  colors.forEach((color) => {
    _arr.push(new THREE.MeshBasicMaterial({ color }));
  });
  return _arr;
}
const cube = new THREE.Mesh(
  geometry,
  rainbowMaterial([
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#00FFFF",
    "#0000FF",
    "#8B00FF",
  ])
);

const parent_material = new THREE.MeshBasicMaterial({
  color: "#FFE4E1",
});
parent_material.wireframe = true;
const parent_cube = new THREE.Mesh(geometry, parent_material);
parent_cube.add(cube);

parent_cube.position.set(-5, 0, 0);
parent_cube.scale.set(2, 2, 2);
parent_cube.rotation.x = Math.PI / 4;

cube.position.set(5, 0, 0);
cube.scale.set(2, 2, 2);
cube.rotation.x = Math.PI / 4;
scene.add(parent_cube);

const plane_geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]);
plane_geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);
plane_geometry.setIndex(new THREE.BufferAttribute(indices, 1));
plane_geometry.addGroup(0, 3, 0);
plane_geometry.addGroup(3, 3, 1);
const plane_material = new THREE.MeshBasicMaterial({
  color: "#FF0000",
});
const plane_material1 = new THREE.MeshBasicMaterial({
  color: "#0000FF",
});
const plane = new THREE.Mesh(plane_geometry, [plane_material, plane_material1]);
scene.add(plane);

const control = helper(baseParams);

function animate() {
  control.update();
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
createGUI({ cube, parent_material });
