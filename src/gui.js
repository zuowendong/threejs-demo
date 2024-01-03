import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

let eventObj = {
  Fullscreen: () => {
    document.body.requestFullscreen();
  },
  ExitFullscreen: () => {
    document.exitFullscreen();
  },
};

export function createGUI(params) {
  const { cube, parent_material } = params;
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
}
