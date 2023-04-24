import * as T from "three";
import { MapControls } from "three/addons/controls/MapControls";

export default (canvas) => {
  const renderer = new T.WebGLRenderer({
    canvas,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new T.Scene();
  const width = 10;
  const height = 10;
  const camera = new T.OrthographicCamera(
    width / -2,
    width / 2,
    height / 2,
    height / -2,
    1,
    1000
  );
  camera.position.z = 5;
  camera.position.y = 5;
  camera.position.x = 5;
  scene.add(camera);
  camera.lookAt(scene.position);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  scene.add(camera);

  const greedHelper = new T.GridHelper(10, 10);
  scene.add(greedHelper);

  const planeMaterial = new T.MeshBasicMaterial({
    color: 0xffffff,
  });
  const planeGeometry = new T.PlaneGeometry(10, 10);
  const plane = new T.Mesh(planeGeometry, planeMaterial);
  plane.rotateX((Math.PI * 270) / 180);
  scene.add(plane);

  new MapControls(camera, canvas);

  const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  };
  animate();
};
