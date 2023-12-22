import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

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
const cube = new THREE.Mesh(geometry, material);

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

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const control = new OrbitControls(camera, renderer.domElement);

function animate() {
  control.update();
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();

let eventObj = {
  Fullscreen: () => {
    document.body.requestFullscreen();
  },
  ExitFullscreen: () => {
    document.exitFullscreen();
  },
};

// 创建gui
const gui = new GUI();
// 添加按钮
gui.add(eventObj, "Fullscreen").name("全屏");
gui.add(eventObj, "ExitFullscreen").name("退出全屏");
// 立方体位置
let folder = gui.addFolder("立方体位置");
folder
  .add(cube.position, "x")
  .min(-10)
  .max(10)
  .step(1)
  .name("立方体x轴位置")
  .onChange((val) => {
    console.log(val);
  });
folder
  .add(cube.position, "y")
  .min(-10)
  .max(10)
  .step(1)
  .name("立方体y轴位置")
  .onFinishChange((val) => {
    console.log(val);
  });
folder.add(cube.position, "z").min(-10).max(10).step(1).name("立方体z轴位置");

gui.add(parent_material, "wireframe").name("父元素线框模式");

let colorParams = {
  cubeColor: "#c4b400",
};
gui
  .addColor(colorParams, "cubeColor")
  .name("立方体颜色")
  .onChange((val) => {
    cube.material.color.set(val);
  });
