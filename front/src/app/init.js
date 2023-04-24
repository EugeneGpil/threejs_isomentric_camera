import * as T from "three";
import { MapControls } from "three/addons/controls/MapControls";

export default (canvas) => {
  const renderer = new T.WebGLRenderer({
    canvas,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

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

  const greedHelper = new T.GridHelper(10, 20);
  // scene.add(greedHelper);

  const planeMaterial = new T.MeshStandardMaterial({
    color: 0xffffff,
  });
  const planeGeometry = new T.PlaneGeometry(10, 10);
  const plane = new T.Mesh(planeGeometry, planeMaterial);
  plane.rotateX((Math.PI * 270) / 180);
  plane.receiveShadow = true;
  scene.add(plane);

  new MapControls(camera, canvas);

  const ambientLight = new T.AmbientLight(0xffffff, 0.175);
  ambientLight.position.y = 5;
  scene.add(ambientLight);

  const directionalLight = new T.DirectionalLight(0xffffff, 2);
  directionalLight.position.y = 300;
  directionalLight.position.x = 100;
  directionalLight.position.z = 100;
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048; // default is 512
  directionalLight.shadow.mapSize.height = 2048; // default is 512
  scene.add(directionalLight);

  const cube1Material = new T.MeshStandardMaterial({
    color: 0xffffff,
  });
  const cube1Geometry = new T.BoxGeometry(1, 2, 1);
  const cube1 = new T.Mesh(cube1Geometry, cube1Material);
  cube1.castShadow = true;
  scene.add(cube1);

  const cube2Material = new T.MeshStandardMaterial({
    color: 0x000000,
  });
  const cube2Geometry = new T.BoxGeometry(1.025, 0.025, 1.025);
  const cube2 = new T.Mesh(cube2Geometry, cube2Material);
  scene.add(cube2);

  const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  };
  animate();
};
