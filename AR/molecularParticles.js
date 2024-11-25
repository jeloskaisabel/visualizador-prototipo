document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("molecular-container");
  const moleculeTypes = [
    {
      type: "NO2",
      color: "#ff0000",
      dataInfo: {
        title: "Dióxido de Nitrógeno (NO₂)",
        details:
          "Gas irritante que causa inflamación de las vías respiratorias y contribuye a la contaminación del aire.",
      },
    },
    {
      type: "CO2",
      color: "#00ff00",
      dataInfo: {
        title: "Dióxido de Carbono (CO₂)",
        details:
          "Gas de efecto invernadero que contribuye al calentamiento global.",
      },
    },
  ];

  // Generar moléculas dinámicamente
  for (let i = 0; i < 30; i++) {
    const moleculeType =
      moleculeTypes[Math.floor(Math.random() * moleculeTypes.length)];
    generateMolecule(container, moleculeType);
  }
});

// Función para generar moléculas dinámicas
function generateMolecule(container, moleculeType) {
  const molecule = document.createElement("a-entity");
  molecule.setAttribute("data-info", JSON.stringify(moleculeType.dataInfo));
  molecule.classList.add("clickable");

  // Generar esferas y enlaces
  const sphere1 = document.createElement("a-sphere");
  sphere1.setAttribute("radius", "0.1");
  sphere1.setAttribute("color", moleculeType.color);

  const sphere2 = document.createElement("a-sphere");
  sphere2.setAttribute("radius", "0.07");
  sphere2.setAttribute("color", "#ffffff");
  sphere2.setAttribute("position", "0.2 0 0");

  const cylinder = document.createElement("a-cylinder");
  cylinder.setAttribute("height", "0.2");
  cylinder.setAttribute("radius", "0.02");
  cylinder.setAttribute("color", "#888888");
  cylinder.setAttribute("position", "0.1 0 0");
  cylinder.setAttribute("rotation", "0 0 90");

  // Agrupar componentes de la molécula
  molecule.appendChild(sphere1);
  molecule.appendChild(sphere2);
  molecule.appendChild(cylinder);

  // Posición inicial aleatoria (corrección de sintaxis)
  const x = (Math.random() - 0.5) * 10;
  const y = Math.random() * 5;
  const z = (Math.random() - 0.5) * 10;
  molecule.setAttribute("position", `${x} ${y} ${z}`);

  // Animación de movimiento aleatorio
  molecule.setAttribute(
    "animation",
    `property: position; to: ${(Math.random() - 0.5) * 10} ${
      Math.random() * 5
    } ${(Math.random() - 0.5) * 10}; loop: true; dur: 8000; dir: alternate;`
  );

  // Evento de clic para mostrar la información
  const info = moleculeType.dataInfo;

  const showInfo = () => {
    console.log("Evento detectado:", event.type);
    console.log("Molécula clickeada");
    showInfoCard(info.title, info.details);
  };

  molecule.addEventListener("click", showInfo);

  container.appendChild(molecule);
}

// Función para mostrar la tarjeta de información
function showInfoCard(title, details) {
  const card = document.getElementById("infoCard");
  document.getElementById("infoTitle").innerText = title;
  document.getElementById("infoDetails").innerText = details;
  card.style.display = "block";
}

// Función para cerrar la tarjeta de información
function closeInfo() {
  document.getElementById("infoCard").style.display = "none";
}

document
  .querySelector("a-camera")
  .addEventListener("raycaster-intersection", function (evt) {
    console.log("Intersección detectada con:", evt.detail.els);
  });
