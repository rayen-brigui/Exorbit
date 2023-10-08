import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const sunTexture = new THREE.TextureLoader().load("./sun.jpg");

// Create the Sun
const sunGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Create planets
const mercuryTexture = new THREE.TextureLoader().load("./mercury.jpg");
const venusTexture = new THREE.TextureLoader().load("./venus.jpg");
const marsTexture = new THREE.TextureLoader().load("./mars.jpg");
const JupiterTexture = new THREE.TextureLoader().load("./jupiter.jpg");
const saturnTexture = new THREE.TextureLoader().load("./saturn.jpg");
const uranusTexture = new THREE.TextureLoader().load("./uranus.jpg");
const neptuneTexture = new THREE.TextureLoader().load("./neptune.jpg");
const earthTexture = new THREE.TextureLoader().load("./earth_nightmap.jpg");
const planets = [];
const planetData = [
  {
    name: "Mercury",
    desc: "Mercury is the closest planet to the sun. Mercury goes around the sun once every 88 Earth days. A day on Mercury lasts a lot longer than a day on Earth. One day on Mercury lasts 59 Earth days.",
    distanceFromEarth: "48 million km",
    radius: "2,439.7 km",
    mass: "3.3011 × 10^23 kg",
    orbitalPeriod: "88 days",
    rotationPeriod: "58.6 days",
    moons: "0",
    discoveryDate: "Known to ancient civilizations",
    discoveredBy: "N/A",
    map: mercuryTexture,
    size: 0.1,
    distance: 2,
  },
  {
    name: "Venus",
    desc: "Venus is the second planet from the Sun and is Earth's closest neighbor in the solar system. It is a terrestrial planet, meaning that it is a rocky body like Earth. It is similar to Earth in size and mass, but has a thick atmosphere that traps heat and makes Venus very hot. Venus is the brightest object in the sky after the Sun and the Moon, and sometimes looks like a bright star in the morning or evening sky",
    distanceFromEarth: "41 million km",
    radius: "6,051.8 km",
    mass: "4.8675 × 10^24 kg",
    orbitalPeriod: "225 days",
    rotationPeriod: "243 days",
    moons: "0",
    discoveryDate: "Known to ancient civilizations",
    discoveredBy: "N/A",
    map: venusTexture,
    size: 0.2,
    distance: 4,
  },
  {
    name: "Earth",
    desc: "Earth is a terrestrial planet. It is small and rocky. Earth's atmosphere is the right thickness to keep the planet warm so living things like us can be there. It’s the only planet in our solar system we know of that supports life. It is mostly nitrogen, and it has plenty of oxygen for us to breathe.",
    distanceFromEarth: "0 km",
    radius: "6,371 km",
    mass: "5.972 × 10^24 kg",
    orbitalPeriod: "365.25 days",
    rotationPeriod: "24 hours",
    moons: "1 (The Moon)",
    discoveryDate: "Known to ancient civilizations",
    discoveredBy: "N/A",
    map: earthTexture,
    size: 0.5,
    distance: 6,
  },
  {
    name: "Mars",
    desc: "Mars is the fourth planet from the Sun in our solar system, often referred to as the 'Red Planet' due to its reddish appearance",
    distanceFromEarth: "140 million km",
    radius: "3,389.5 km",
    mass: "6.4171 × 10^23 kg",
    orbitalPeriod: "687 days",
    rotationPeriod: "24.6 hours",
    moons: "2 (Phobos and Deimos)",
    discoveryDate: "Known to ancient civilizations",
    discoveredBy: "N/A",
    map: marsTexture,
    size: 0.3,
    distance: 8,
  },
  {
    name: "Jupiter",
    desc: "Jupiter is the biggest planet in our solar system. It's similar to a star, but it never got massive enough to start burning. It is covered in swirling cloud stripes. It has big storms like the Great Red Spot, which has been going for hundreds of years. Jupiter is a gas giant and doesn't have a solid surface, but it may have a solid inner core about the size of Earth. Jupiter also has rings,   but they're too faint to see very well.",
    distanceFromEarth: "484 million km",
    radius: "69,911 km",
    mass: "1.898 × 10^27 kg",
    orbitalPeriod: "11.9 years",
    rotationPeriod: "9.9 hours",
    moons: "79 (including Ganymede, Callisto, Io, and Europa)",
    discoveryDate: "Known to ancient civilizations",
    discoveredBy: "N/A",
    map: JupiterTexture,
    size: 0.7,
    distance: 10,
  },
  {
    name: "Saturn",
    desc: "Saturn is the sixth planet from the Sun and the second largest planet in our solar system. Adorned with thousands of beautiful ringlets, Saturn is unique among the planets. It is not the only planet to have rings—made of chunks of ice and rock—but none are as spectacular or as complicated as Saturn's. Like fellow gas giant Jupiter, Saturn is a massive ball made mostly of hydrogen and helium.",
    distanceFromEarth: "≈ 869 billion km",
    radius: "58,232 km",
    mass: "5.683 × 10^26 kg",
    orbitalPeriod: "29.5 years",
    rotationPeriod: "10.7 hours",
    moons: "83 (including Titan, Enceladus, and Mimas)",
    discoveryDate: "Known to ancient civilizations",
    discoveredBy: "N/A",
    map: saturnTexture,
    size: 0.6,
    distance: 12,
  },
  {
    name: "Uranus",
    desc: "Uranus is very cold and windy. It is surrounded by faint rings and more than two dozen small moons as it rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.",
    distanceFromEarth: "≈ 1,800 billion km",
    radius: "25,362 km",
    mass: "8.681 × 10^25 kg",
    orbitalPeriod: "84 years",
    rotationPeriod: "17.2 hours",
    moons: "27 (including Titania, Oberon, and Ariel)",
    discoveryDate: "1781 by William Herschel",
    discoveredBy: "William Herschel",
    map: uranusTexture,
    size: 0.4,
    distance: 14,
  },
  {
    name: "Neptune",
    desc: "Dark, cold and whipped by supersonic winds, giant Neptune is the eighth and most distant major planet orbiting our Sun. More than 30 times as far from the Sun as Earth, Neptune is not visible to the naked eye. In 2011, Neptune completed its first 165-year orbit since its discovery.",
    distanceFromEarth: "2,700 billion km",
    radius: "24,622 km",
    mass: "1.024 × 10^26 kg",
    orbitalPeriod: "165 years",
    rotationPeriod: "16.1 hours",
    moons: "14 (including Triton and Nereid)",
    discoveryDate: "1846 by Johann Galle",
    discoveredBy: "Johann Galle",
    map: neptuneTexture,
    size: 0.4,
    distance: 16,
  },
];

planetData.forEach((data) => {
  const planetGeometry = new THREE.SphereGeometry(data.size, 16, 16);
  const planetMaterial = new THREE.MeshBasicMaterial({
    map: data.map,
  });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  planet.name = data.name; // Set the name so we can access it later
  planet.userData.desc = data.desc; // Set the description in userData
  planet.userData.distanceFromEarth = data.distanceFromEarth;
  planet.userData.radius = data.radius;
  planet.userData.mass = data.mass;
  planet.userData.orbitalPeriod = data.orbitalPeriod;
  planet.userData.rotationPeriod = data.rotationPeriod;
  planet.userData.moons = data.moons;
  planet.userData.discoveryDate = data.discoveryDate;
  planet.userData.discoveredBy = data.discoveredBy;
  // Position the planets in a circle
  const angle = Math.random() * Math.PI * 2;
  planet.position.set(
    Math.cos(angle) * data.distance,
    0,
    Math.sin(angle) * data.distance
  );

  planets.push(planet);
  scene.add(planet);
});
// Load the background texture
const spaceTexture = new THREE.TextureLoader().load("./stars.jpg");

// Create a background sphere with the texture
const backgroundGeometry = new THREE.SphereGeometry(500, 16, 16);
const backgroundMaterial = new THREE.MeshBasicMaterial({
  map: spaceTexture,
  side: THREE.BackSide,
});
const backgroundSphere = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
scene.add(backgroundSphere);
// Set up camera controls
const controls = new OrbitControls(camera, renderer.domElement);
// Set up the render loop
const animate = () => {
  requestAnimationFrame(animate);

  // Rotate the planets
  planets.forEach((planet) => {
    planet.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
};
// Create the orbit lines
planetData.forEach((data) => {
  const orbitRadius = data.distance;
  const orbitPoints = [];

  // Create points for the orbit
  for (let i = 0; i <= 360; i++) {
    const radians = (i / 180) * Math.PI; // Convert degrees to radians
    const x = orbitRadius * Math.cos(radians);
    const z = orbitRadius * Math.sin(radians);
    orbitPoints.push(new THREE.Vector3(x, 0, z));
  }

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
  orbitLine.position.y = 0; // Adjust the height to match the planet's position

  scene.add(orbitLine);
});

animate();
function showPlanetInfo(Planet) {
  document.getElementById("planet-name").textContent = Planet.name;
  document.getElementById("planet-desc").textContent = Planet.userData.desc;
  document.getElementById("planet-distanceFromEarth").textContent =
    Planet.userData.distanceFromEarth;
  document.getElementById("planet-radius").textContent = Planet.userData.radius;
  document.getElementById("planet-mass").textContent = Planet.userData.mass;
  document.getElementById("planet-orbitalPeriod").textContent =
    Planet.userData.orbitalPeriod;
  document.getElementById("planet-rotationPeriod").textContent =
    Planet.userData.rotationPeriod;
  document.getElementById("planet-moons").textContent = Planet.userData.moons;
  document.getElementById("planet-discoveryDate").textContent =
    Planet.userData.discoveryDate;
  document.getElementById("planet-discoveredBy").textContent =
    Planet.userData.discoveredBy;
}
let targetPosition = new THREE.Vector3();

// Function to smoothly animate the camera to the target position
function moveCameraToTarget(target, duration = 1000) {
  const startPosition = camera.position.clone();
  let startTime = null;

  function animate(time) {
    if (!startTime) startTime = time;

    const progress = (time - startTime) / duration;
    if (progress < 1) {
      const newPosition = new THREE.Vector3().lerpVectors(
        startPosition,
        target,
        progress
      );
      camera.position.copy(newPosition);
      requestAnimationFrame(animate);
       controls.update();
    } else {
      camera.position.copy(target);
       controls.update();
      
    }
  }

  requestAnimationFrame(animate);
  
}

document.addEventListener("click", (event) => {
  // Calculate normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycast from the camera to detect intersections with planets
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets);

  if (intersects.length > 0) {
    // Display planet information when clicked
    const planet = intersects[0].object;
    showPlanetInfo(planet); // Use userData to access the desc

    // Set the target position near the selected planet
    targetPosition.copy(planet.position).normalize().multiplyScalar(10);

    // Animate the camera to the target position
    moveCameraToTarget(targetPosition);
  }
});

