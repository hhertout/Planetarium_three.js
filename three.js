import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.getElementById("canvas");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const planetSize = {
  sun: 300,
  moon: 3.4,
  earth: 12.7,
  mars: 6.7,
  venus: 12.1,
  mercury: 4.8,
  jupiter: 139.8,
  saturn: 116.4,
  uranus: 50.7,
  neptun: 49.2,
};

const distReducerRatio = 0.004;
const dist = {
  moonEarth: 384 * distReducerRatio,
  sunEarth: 150000 * distReducerRatio,
  sunMercury: 57000 * distReducerRatio,
  sunVenus: 108208 * distReducerRatio,
  sunMars: 227939 * distReducerRatio,
  sunJupiter: 778600 * distReducerRatio,
  sunSaturn: 1430000 * distReducerRatio,
  sunNeptun: 4470000 * distReducerRatio,
  sunUranus: 2900000 * distReducerRatio,
};

const revolutionTimeReducerRatio = 0.01;
const revolutionTime = {
  earth: 1 / (365 * revolutionTimeReducerRatio),
  mercury: 1 / (88 * revolutionTimeReducerRatio),
  venus: 1 / (0.615 * 365 * revolutionTimeReducerRatio),
  mars: 1 / (687 * revolutionTimeReducerRatio),
  jupiter: 1 / (4333 * revolutionTimeReducerRatio),
  saturn: 1 / (10731 * revolutionTimeReducerRatio),
  neptun: 1 / (60225 * revolutionTimeReducerRatio),
  uranus: 1 / (30660 * revolutionTimeReducerRatio),
};

const rotationTime = {
    sun: 1 / 25,
  earth: 1,
  mercury: 1 / 58,
  venus: 1 / 243,
  jupiter: 1 / (24 / 9),
  mars: 1,
  saturn: 1 / (24 / 10),
  uranus: 1 / (24 / 17),
  neptun: 1 / (24 / 16),
};

const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load("./static/textures/sun.jpg");
const earthTexture = textureLoader.load("./static/textures/earth.jpg");
const moonTexture = textureLoader.load("./static/textures/moon.jpg");
const mercuryTexture = textureLoader.load("./static/textures/mercury.jpg");
const venusTexture = textureLoader.load("./static/textures/venus.jpg");
const marsTexture = textureLoader.load("./static/textures/mars.jpg");
const jupiterTexture = textureLoader.load("./static/textures/jupiter.jpg");
const neptunTexture = textureLoader.load("./static/textures/neptune.jpg");
const uranusTexture = textureLoader.load("./static/textures/uranus.jpg");
const saturnTexture = textureLoader.load("./static/textures/saturn.jpg");

const scene = new THREE.Scene();

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(planetSize.sun, 120, 120),
  new THREE.MeshBasicMaterial({
    map: sunTexture,
  })
);
scene.add(sun);
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(planetSize.mercury, 60, 60),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
  })
);
scene.add(mercury);

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(planetSize.venus, 60, 60),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
);
scene.add(venus);

const earthAndMoon = new THREE.Group();
scene.add(earthAndMoon);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(planetSize.earth, 60, 60),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);
earthAndMoon.add(earth);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(planetSize.moon, 60, 60),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);
earthAndMoon.add(moon);

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(planetSize.mars, 60, 60),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);
scene.add(mars);

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(planetSize.jupiter, 120, 120),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);
scene.add(jupiter);

const neptun = new THREE.Mesh(
  new THREE.SphereGeometry(planetSize.neptun, 120, 120),
  new THREE.MeshStandardMaterial({
    map: neptunTexture,
  })
);
scene.add(neptun);

const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(planetSize.uranus, 120, 120),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
  })
);
scene.add(uranus);

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  300000
);
camera.position.set(0, 1400, 1400);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const light = new THREE.PointLight();
light.intensity = 1.5;
light.decay = 4;
scene.add(light);

const ambientLight = new THREE.AmbientLight();
ambientLight.intensity = 0.2;
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  mercury.position.x =
    Math.cos(elapsedTime * revolutionTime.mercury) * dist.sunMercury;
  mercury.position.z =
    Math.sin(elapsedTime * revolutionTime.mercury) * dist.sunMercury;

  venus.position.x =
    Math.cos(elapsedTime * revolutionTime.venus) * dist.sunVenus;
  venus.position.z =
    Math.sin(elapsedTime * revolutionTime.venus) * dist.sunVenus;

  const moonRotationRatio = 0.5;

  earth.position.x =
    Math.cos(elapsedTime * revolutionTime.earth) * dist.sunEarth;
  earth.position.z =
    Math.sin(elapsedTime * revolutionTime.earth) * dist.sunEarth;
  moon.position.x =
    earth.position.x +
    Math.cos(elapsedTime * moonRotationRatio) * dist.moonEarth;
  moon.position.z =
    earth.position.z +
    Math.sin(elapsedTime * moonRotationRatio) * dist.moonEarth;
  moon.rotation.y = elapsedTime / (2 * Math.PI);

  mars.position.x = Math.cos(elapsedTime * revolutionTime.mars) * dist.sunMars;
  mars.position.z = Math.sin(elapsedTime * revolutionTime.mars) * dist.sunMars;

  neptun.position.x =
    Math.cos(elapsedTime * revolutionTime.neptun) * dist.sunNeptun;
  neptun.position.z =
    Math.sin(elapsedTime * revolutionTime.neptun) * dist.sunNeptun;

  uranus.position.x =
    Math.cos(elapsedTime * revolutionTime.uranus) * dist.sunUranus;
  uranus.position.z =
    Math.sin(elapsedTime * revolutionTime.uranus) * dist.sunUranus;

  jupiter.position.x =
    Math.cos(elapsedTime * revolutionTime.jupiter) * dist.sunJupiter;
  jupiter.position.z =
    Math.sin(elapsedTime * revolutionTime.jupiter) * dist.sunJupiter;

  sun.rotation.y = -elapsedTime * rotationTime.sun;
  earth.rotation.y = elapsedTime * rotationTime.earth;
  mercury.rotation.y = elapsedTime * rotationTime.mercury;
  venus.rotation.y = elapsedTime * rotationTime.venus;
  mars.rotation.y = elapsedTime * rotationTime.mars;
  jupiter.rotation.y = elapsedTime * rotationTime.jupiter;
  neptun.rotation.y = elapsedTime * rotationTime.neptun;
  uranus.rotation.y = elapsedTime * rotationTime.uranus;

  renderer.render(scene, camera);

  controls.update();

  window.requestAnimationFrame(tick);
};

tick();
