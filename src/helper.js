import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function helper(params) {
  const { scene, camera, renderer } = params;

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const control = new OrbitControls(camera, renderer.domElement);

  return control;
}
