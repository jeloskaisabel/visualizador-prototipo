document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("molecular-container");

  // Lista para almacenar las posiciones de las moléculas
  const moleculePositions = [];

  // Definición de las moléculas con sus estructuras
  const molecules = [
    {
      name: "NO2",
      create: createNO2Structure,
    },
    {
      name: "CO2",
      create: createCO2Structure,
    },
    // Puedes agregar más moléculas aquí
  ];

  // Generar múltiples moléculas flotantes
  for (let i = 0; i < 70; i++) {
    const moleculeData =
      molecules[Math.floor(Math.random() * molecules.length)];
    const molecule = moleculeData.create();
    positionMolecule(molecule);
    animateMolecule(molecule);
    container.appendChild(molecule);
  }

  // Función para verificar si una posición está cerca de otra
  function isPositionTooClose(position, positions, minDistance) {
    for (let pos of positions) {
      const distance = Math.sqrt(
        Math.pow(pos.x - position.x, 2) +
          Math.pow(pos.y - position.y, 2) +
          Math.pow(pos.z - position.z, 2)
      );
      if (distance < minDistance) {
        return true;
      }
    }
    return false;
  }

  // Función para posicionar la molécula en un lugar aleatorio
  function positionMolecule(molecule) {
    let position;
    let attempts = 0;
    const maxAttempts = 10;
    do {
      const x = (Math.random() - 0.5) * 1.5;
      const y = Math.random() * 1.5 + 1;
      const z = -Math.random() * 1.5 - 0.5;
      position = { x: x, y: y, z: z };
      attempts++;
    } while (
      isPositionTooClose(position, moleculePositions, 0.2) &&
      attempts < maxAttempts
    );

    molecule.setAttribute(
      "position",
      `${position.x} ${position.y} ${position.z}`
    );
    moleculePositions.push(position);
  }
});

// Función para crear la estructura de NO2
function createNO2Structure() {
  const molecule = document.createElement("a-entity");
  molecule.setAttribute("scale", "0.01 0.01 0.01"); // Escala muy pequeña

  const group = document.createElement("a-entity");

  // Átomo central de nitrógeno
  const nitrogen = document.createElement("a-sphere");
  nitrogen.setAttribute("radius", 1);
  nitrogen.setAttribute("color", "#3050F8"); // Azul para nitrógeno
  nitrogen.setAttribute("position", "0 0 0");
  group.appendChild(nitrogen);

  // Átomo de oxígeno 1 (enlace simple)
  const oxygen1 = document.createElement("a-sphere");
  oxygen1.setAttribute("radius", 1);
  oxygen1.setAttribute("color", "#FF0D0D"); // Rojo para oxígeno
  oxygen1.setAttribute("position", "2 0 0");
  group.appendChild(oxygen1);

  // Enlace simple al oxígeno 1
  const bond1 = document.createElement("a-cylinder");
  bond1.setAttribute("radius", 0.2);
  bond1.setAttribute("height", 2);
  bond1.setAttribute("color", "#CCCCCC");
  bond1.setAttribute("position", "1 0 0");
  bond1.setAttribute("rotation", "0 0 90");
  group.appendChild(bond1);

  // Átomo de oxígeno 2 (enlace doble)
  const oxygen2 = document.createElement("a-sphere");
  oxygen2.setAttribute("radius", 1);
  oxygen2.setAttribute("color", "#FF0D0D");
  oxygen2.setAttribute("position", "-1.7 0 1");
  group.appendChild(oxygen2);

  // Enlaces dobles al oxígeno 2
  const bond2a = document.createElement("a-cylinder");
  bond2a.setAttribute("radius", 0.1);
  bond2a.setAttribute("height", 2);
  bond2a.setAttribute("color", "#CCCCCC");
  bond2a.setAttribute("position", "-0.85 0.1 0.5");
  bond2a.setAttribute("rotation", "0 50 90");
  group.appendChild(bond2a);

  const bond2b = document.createElement("a-cylinder");
  bond2b.setAttribute("radius", 0.1);
  bond2b.setAttribute("height", 2);
  bond2b.setAttribute("color", "#CCCCCC");
  bond2b.setAttribute("position", "-0.85 -0.1 0.5");
  bond2b.setAttribute("rotation", "0 50 90");
  group.appendChild(bond2b);

  molecule.appendChild(group);

  return molecule;
}

// Función para crear la estructura de CO2
function createCO2Structure() {
  const molecule = document.createElement("a-entity");
  molecule.setAttribute("scale", "0.01 0.01 0.01"); // Escala muy pequeña

  const group = document.createElement("a-entity");

  // Átomo central de carbono
  const carbon = document.createElement("a-sphere");
  carbon.setAttribute("radius", 1);
  carbon.setAttribute("color", "#909090"); // Gris para carbono
  carbon.setAttribute("position", "0 0 0");
  group.appendChild(carbon);

  // Átomo de oxígeno 1 (enlace doble)
  const oxygen1 = document.createElement("a-sphere");
  oxygen1.setAttribute("radius", 1);
  oxygen1.setAttribute("color", "#FF0D0D"); // Rojo para oxígeno
  oxygen1.setAttribute("position", "2 0 0");
  group.appendChild(oxygen1);

  // Enlaces dobles al oxígeno 1
  const bond1a = document.createElement("a-cylinder");
  bond1a.setAttribute("radius", 0.1);
  bond1a.setAttribute("height", 2);
  bond1a.setAttribute("color", "#CCCCCC");
  bond1a.setAttribute("position", "1 0.2 0");
  bond1a.setAttribute("rotation", "0 0 90");
  group.appendChild(bond1a);

  const bond1b = document.createElement("a-cylinder");
  bond1b.setAttribute("radius", 0.1);
  bond1b.setAttribute("height", 2);
  bond1b.setAttribute("color", "#CCCCCC");
  bond1b.setAttribute("position", "1 -0.2 0");
  bond1b.setAttribute("rotation", "0 0 90");
  group.appendChild(bond1b);

  // Átomo de oxígeno 2 (enlace doble)
  const oxygen2 = document.createElement("a-sphere");
  oxygen2.setAttribute("radius", 1);
  oxygen2.setAttribute("color", "#FF0D0D");
  oxygen2.setAttribute("position", "-2 0 0");
  group.appendChild(oxygen2);

  // Enlaces dobles al oxígeno 2
  const bond2a = document.createElement("a-cylinder");
  bond2a.setAttribute("radius", 0.1);
  bond2a.setAttribute("height", 2);
  bond2a.setAttribute("color", "#CCCCCC");
  bond2a.setAttribute("position", "-1 0.2 0");
  bond2a.setAttribute("rotation", "0 0 90");
  group.appendChild(bond2a);

  const bond2b = document.createElement("a-cylinder");
  bond2b.setAttribute("radius", 0.1);
  bond2b.setAttribute("height", 2);
  bond2b.setAttribute("color", "#CCCCCC");
  bond2b.setAttribute("position", "-1 -0.2 0");
  bond2b.setAttribute("rotation", "0 0 90");
  group.appendChild(bond2b);

  molecule.appendChild(group);

  return molecule;
}

function animateMolecule(molecule) {
  const duration = 5000 + Math.random() * 5000; // Duración aleatoria entre 5 y 10 segundos

  // Obtener posición inicial
  const initialPosition = molecule.getAttribute("position");

  // Animación de movimiento en posición
  molecule.setAttribute("animation__position", {
    property: "position",
    dir: "alternate",
    dur: duration,
    easing: "easeInOutSine",
    loop: true,
    to: {
      x: parseFloat(initialPosition.x) + (Math.random() - 0.5) * 0.5,
      y: parseFloat(initialPosition.y) + (Math.random() - 0.5) * 0.5,
      z: parseFloat(initialPosition.z) + (Math.random() - 0.5) * 0.5,
    },
  });

  // Animación de rotación lenta
  molecule.setAttribute("animation__rotation", {
    property: "rotation",
    dur: duration * 2,
    easing: "linear",
    loop: true,
    to: {
      x: Math.random() * 360,
      y: Math.random() * 360,
      z: Math.random() * 360,
    },
  });
}
