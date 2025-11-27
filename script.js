// ========== SCROLL FUNCTION FOR BUTTON ========== //
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// ========== CHATBOT TOGGLE ========== //
function toggleChatbot() {
  const box = document.getElementById("chatbotContainer");
  if (box.style.display === "flex") {
    box.style.display = "none";
  } else {
    box.style.display = "flex";
    // Focus input when opening
    setTimeout(() => {
      const inp = document.getElementById("chatInput");
      if (inp) inp.focus();
    }, 100);
  }
}

// ========== ADVANCED ELECTROBOT (FRONTEND ONLY) ========== //

// 1) Knowledge base – you can keep expanding this over time
const knowledgeBase = [
  // BASIC LAWS
  {
    topic: "Ohm's Law",
    keywords: ["ohm", "ohm's law", "ohms law", "v = i r", "v=i*r", "voltage current resistance"],
    answer: `Ohm’s law relates voltage (V), current (I) and resistance (R).

Formula:
• V = I × R
• I = V / R
• R = V / I

Where:
• V = voltage in Volts (V)
• I = current in Amperes (A)
• R = resistance in Ohms (Ω)

It is used to calculate how much current flows for a given voltage and resistance.`
  },
  {
    topic: "Kirchhoff's Laws",
    keywords: ["kirchhoff", "kcl", "kvl", "kirchhoff's current law", "kirchhoff's voltage law"],
    answer: `Kirchhoff’s Laws are used for circuit analysis:

KCL (Kirchhoff's Current Law):
• At any node, sum of currents entering = sum of currents leaving.
• Based on conservation of charge.

KVL (Kirchhoff's Voltage Law):
• Sum of voltages around any closed loop = 0.
• Based on conservation of energy.

You use KCL and KVL together to solve complex networks with many resistors and sources.`
  },

  // PASSIVE COMPONENTS
  {
    topic: "Resistor",
    keywords: ["resistor", "resistance", "ohmic", "potentiometer", "ldr"],
    answer: `A resistor is a component that opposes the flow of current.

Key points:
• Unit: Ohm (Ω)
• Ohmic resistor: follows Ohm’s law (V ∝ I)
• Uses: current limiting, voltage division, biasing of transistors
• Types: fixed, variable (potentiometer), LDR (light-dependent resistor)

Example: A series resistor with an LED prevents it from burning due to excess current.`
  },
  {
    topic: "Capacitor",
    keywords: ["capacitor", "capacitance", "charging", "discharging", "reactance"],
    answer: `A capacitor stores electrical energy in an electric field between its plates.

Key points:
• Unit: Farad (F)
• Reactance decreases with frequency (Xc = 1 / (2πfC))
• DC: blocks after charging
• AC: allows AC signals depending on frequency

Common uses:
• Filtering (power supplies)
• Coupling/decoupling
• Timing circuits (RC networks)
• Energy storage (snubbers, camera flash, etc.)`
  },
  {
    topic: "Inductor",
    keywords: ["inductor", "inductance", "coil", "choke"],
    answer: `An inductor stores energy in a magnetic field when current flows through it.

Key points:
• Unit: Henry (H)
• Reactance increases with frequency (Xl = 2πfL)
• Opposes rapid changes in current
• Often used in filters, SMPS, chokes, and energy transfer in converters.`
  },

  // DIODES, LED, RECTIFIER
  {
    topic: "Diode",
    keywords: ["diode", "pn junction", "rectifier", "forward bias", "reverse bias"],
    answer: `A diode is a PN junction device that ideally allows current in only one direction.

Key points:
• Forward biased: conducts (about 0.7 V for silicon, 0.3 V for germanium)
• Reverse biased: ideally blocks current
• Used in rectifiers (AC to DC), clamping, protection, and switching.`
  },
  {
    topic: "LED",
    keywords: ["led", "light emitting diode", "indicator led"],
    answer: `LED stands for Light Emitting Diode.

Key points:
• Emits light when forward biased
• Needs a series resistor to limit current
• Forward voltage depends on colour (approx):
  – Red ~ 1.8–2.2 V
  – Blue/White ~ 3–3.3 V
• Very efficient and long-lasting, widely used as indicators and for lighting.`
  },
  {
    topic: "Rectifier",
    keywords: ["rectifier", "half wave", "full wave", "bridge rectifier"],
    answer: `A rectifier converts AC to DC using diodes.

Types:
• Half-wave rectifier – uses one diode; output only during one half cycle.
• Full-wave (center-tapped) – uses two diodes.
• Bridge rectifier – uses four diodes; no center-tap needed.

Usually followed by a filter capacitor to reduce ripple.`
  },

  // TRANSISTORS & AMPLIFIERS
  {
    topic: "BJT Transistor",
    keywords: ["transistor", "bjt", "npn", "pnp", "emitter", "collector", "base"],
    answer: `A BJT (Bipolar Junction Transistor) is a current-controlled device.

Key points:
• Terminals: emitter, base, collector
• Types: NPN, PNP
• In active region, a small base current controls a larger collector current.
• Used for both switching and amplification (e.g., audio amplifiers, signal amplification).`
  },
  {
    topic: "MOSFET",
    keywords: ["mosfet", "gate", "drain", "source", "power mosfet"],
    answer: `MOSFET (Metal Oxide Semiconductor Field Effect Transistor) is a voltage-controlled device.

Key points:
• Terminals: gate, drain, source
• Very high input impedance (gate)
• Widely used in power electronics: motor drivers, SMPS, inverters
• Logic-level MOSFETs can be driven directly from microcontrollers in many cases.`
  },
  {
    topic: "Op-Amp",
    keywords: ["op amp", "operational amplifier", "741", "inverting amplifier", "non inverting"],
    answer: `An operational amplifier (op-amp) is a high-gain differential amplifier.

Ideal op-amp assumptions:
• Infinite gain
• Infinite input impedance
• Zero output impedance

Common configurations:
• Inverting amplifier
• Non-inverting amplifier
• Summing amplifier
• Comparator
• Filters (low-pass, high-pass, etc.)`
  },

  // DIGITAL, LOGIC
  {
    topic: "Logic Gates",
    keywords: ["logic gate", "and gate", "or gate", "not gate", "nand", "nor", "xor"],
    answer: `Logic gates are the basic building blocks of digital circuits.

Examples:
• AND – output 1 only if all inputs are 1
• OR – output 1 if any input is 1
• NOT – inverts the input
• NAND, NOR – universal gates (can build any logic)
• XOR – output 1 when inputs are different

Used to implement combinational and sequential digital systems.`
  },
  {
    topic: "Flip-Flop",
    keywords: ["flip flop", "latch", "sr flip flop", "jk flip flop", "d flip flop"],
    answer: `Flip-flops are basic memory elements in digital electronics.

Types:
• SR (Set-Reset) latch/flip-flop
• D (Data) flip-flop
• JK flip-flop
• T (Toggle) flip-flop

They store 1 bit of information and are used in counters, registers, and sequential circuits.`
  },

  // MACHINES & POWER
  {
    topic: "Transformer",
    keywords: ["transformer", "primary", "secondary", "step up", "step down"],
    answer: `A transformer transfers electrical energy between two windings using mutual induction.

Key points:
• Works on AC (not DC)
• Step-up: increases voltage, decreases current
• Step-down: decreases voltage, increases current
• Ideal transformer: Vp/Vs = Np/Ns and Ip/Is = Ns/Np

Used in power supplies, distribution, isolation, etc.`
  },
  {
    topic: "Induction Motor",
    keywords: ["induction motor", "three phase motor", "squirrel cage"],
    answer: `An induction motor is an AC motor where rotor current is induced by the stator’s rotating magnetic field.

Key points:
• Most common industrial motor
• Types: squirrel-cage rotor, slip-ring rotor
• Speed is slightly less than synchronous speed (slip)
• Robust and simple construction.`
  },

  // EMBEDDED / IOT
  {
    topic: "Arduino / Microcontroller",
    keywords: ["arduino", "microcontroller", "uno", "esp32", "embedded", "io"],
    answer: `A microcontroller is a small computer on a single IC with CPU, memory, and peripherals.

Arduino:
• Open-source platform based on microcontrollers (e.g., ATmega328P)
• Easy to program using Arduino IDE
• Used in IoT, automation, sensor interfacing, robotics, mini projects, etc.`
  },

  // GENERAL HELP
  {
    topic: "Help",
    keywords: ["help", "how to use", "what can you do", "examples"],
    answer: `You can ask me things like:
• Explain Ohm’s law in simple words
• Difference between AC and DC
• What is a MOSFET? Where is it used?
• What is the function of a capacitor in a power supply?
• What is a bridge rectifier?
• What is an induction motor?
• What is Arduino and where is it used?

I’m focused on basic to intermediate electronics and EEE topics.`
  }
];

// 2) Utility: normalize + tokenize text
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s\.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalizeText(text).split(" ").filter(Boolean);
}

// 3) Extra: smart Ohm’s law solver (numeric)
function tryOhmsLawCalc(userText) {
  const t = normalizeText(userText);

  // if no mention of Ohm / V I R pattern, skip
  if (
    !t.includes("ohm") &&
    !t.includes("ohms") &&
    !t.includes("v = i r") &&
    !t.includes("v=i*r")
  ) {
    const hasV = /v(olt(age)?)?/.test(t);
    const hasI = /current| amp|amps| a /.test(" " + t + " ");
    const hasR = /ohm|ohms|resistance| r /.test(" " + t + " ");
    if (!((hasV && hasI) || (hasV && hasR) || (hasI && hasR))) return null;
  }

  const matches = [
    ...t.matchAll(
      /(\d+(\.\d+)?)(\s*)(v|volt|voltage|a|amp|amps|ohm|ohms|resistance|r|i|current)?/g
    )
  ];

  let V = null,
    I = null,
    R = null;

  for (const m of matches) {
    const value = parseFloat(m[1]);
    const unit = (m[4] || "").toLowerCase();

    if (/v|volt|voltage/.test(unit)) V = value;
    else if (/a|amp|amps|current| i/.test(" " + unit)) I = value;
    else if (/ohm|ohms|resistance| r/.test(" " + unit)) R = value;
  }

  // Rough fallback: if only 2 numbers and no units, assume V and R
  if (matches.length >= 2 && V === null && I === null && R === null) {
    V = parseFloat(matches[0][1]);
    R = parseFloat(matches[1][1]);
  }

  if (V != null && R != null && I == null && R !== 0) {
    const Icalc = V / R;
    return `Using Ohm’s law: I = V / R = ${V} / ${R} = ${Icalc.toFixed(3)} A`;
  }
  if (V != null && I != null && R == null && I !== 0) {
    const Rcalc = V / I;
    return `Using Ohm’s law: R = V / I = ${V} / ${I} = ${Rcalc.toFixed(3)} Ω`;
  }
  if (I != null && R != null && V == null) {
    const Vcalc = I * R;
    return `Using Ohm’s law: V = I × R = ${I} × ${R} = ${Vcalc.toFixed(3)} V`;
  }

  return null;
}

// 4) Main brain: find best answer
function findAnswer(userText) {
  const text = normalizeText(userText);
  const tokens = tokenize(text);

  // 1) Try Ohm’s law calculator
  const ohmResult = tryOhmsLawCalc(userText);
  if (ohmResult) return ohmResult;

  // 2) Score each knowledgeBase item by keyword overlap
  let best = null;
  let bestScore = 0;

  for (const item of knowledgeBase) {
    let score = 0;

    for (const key of item.keywords) {
      const normKey = normalizeText(key);
      if (text.includes(normKey)) {
        score += 3;
      }

      const keyTokens = tokenize(normKey);
      for (const kt of keyTokens) {
        if (tokens.includes(kt)) score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  if (best && bestScore > 0) {
    return best.answer;
  }

  // 3) Fallback: generic reply
  return (
    "I couldn't exactly match your question to a topic I know 😅, but I’m focused on basic–intermediate electronics.\n\n" +
    "Try rephrasing your question like:\n" +
    "• \"Explain [topic] in simple terms\" (e.g., MOSFET, op-amp, induction motor)\n" +
    "• \"Difference between [X] and [Y]\" (e.g., BJT and MOSFET, AC and DC)\n" +
    "• \"Use Ohm’s law to calculate ...\" (give V, I, or R)\n\n" +
    "You can ask about resistors, capacitors, diodes, transistors, LEDs, rectifiers, op-amps, transformers, motors, logic gates, Arduino, etc."
  );
}

function appendMessage(text, sender = "bot") {
  const container = document.getElementById("chatbotBody");
  if (!container) return;

  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");
  if (sender === "user") msgDiv.classList.add("user-msg");
  else msgDiv.classList.add("bot-msg");

  msgDiv.textContent = text;
  container.appendChild(msgDiv);

  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  appendMessage(text, "user");
  input.value = "";

  const typingId = "typing";
  appendMessage("ElectroBot is thinking...", "bot");
  const container = document.getElementById("chatbotBody");
  const indicator = container.lastChild;
  indicator.id = typingId;

  fetch("http://127.0.0.1:8000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(typingId)?.remove();
      appendMessage(data.reply, "bot");
    })
    .catch(() => {
      document.getElementById(typingId)?.remove();
      appendMessage(findAnswer(text), "bot");
    });
}

// Initial welcome message
window.addEventListener("load", () => {
  appendMessage(
    "Hi, I’m ElectroBot 🤖⚡\nAsk me anything about basic electronics – e.g., 'What is a resistor?' or 'Explain Ohm’s law'."
  );
});

// ========== CIRCUIT PLAYZONE 2.0 (CONNECT + REMOVE + SWITCH TO LIGHT LED) ========== //

let nodeIdCounter = 0;
const circuitNodes = {}; // id -> {id, type, el, switchOn}
const circuitEdges = []; // {from, to, el}
let selectedNodeId = null;

// Add a new component node to the board
function addNode(type) {
  const canvas = document.getElementById("circuitCanvas");
  if (!canvas) return;

  const id = "node-" + ++nodeIdCounter;

  const node = document.createElement("div");
  node.className = `circuit-node ${type}`;
  node.dataset.id = id;
  node.dataset.type = type;
  node.textContent =
    type === "battery"
      ? "Battery"
      : type === "resistor"
      ? "Resistor"
      : type === "led"
      ? "LED"
      : "Switch";

  node.style.left = "120px";
  node.style.top = "80px";

  makeDraggable(node, canvas);

  node.addEventListener("click", onNodeClick);

  if (type === "switch") {
    node.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      toggleSwitch(id);
    });
  }

  canvas.appendChild(node);

  circuitNodes[id] = {
    id,
    type,
    el: node,
    switchOn: false
  };

  recomputeCircuit();
}

// Draggable behaviour for a node
function makeDraggable(element, container) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  function pointerDown(e) {
    isDragging = true;
    const elRect = element.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    offsetX = clientX - elRect.left;
    offsetY = clientY - elRect.top;

    document.addEventListener("mousemove", pointerMove);
    document.addEventListener("mouseup", pointerUp);
    document.addEventListener("touchmove", pointerMove, { passive: false });
    document.addEventListener("touchend", pointerUp);
  }

  function pointerMove(e) {
    if (!isDragging) return;
    e.preventDefault();

    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    let x = clientX - rect.left - offsetX;
    let y = clientY - rect.top - offsetY;

    const maxX = rect.width - element.offsetWidth;
    const maxY = rect.height - element.offsetHeight;
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    element.style.left = x + "px";
    element.style.top = y + "px";

    const id = element.dataset.id;
    if (id) updateWiresForNode(id);
  }

  function pointerUp() {
    isDragging = false;
    document.removeEventListener("mousemove", pointerMove);
    document.removeEventListener("mouseup", pointerUp);
    document.removeEventListener("touchmove", pointerMove);
    document.removeEventListener("touchend", pointerUp);
    recomputeCircuit();
  }

  element.addEventListener("mousedown", pointerDown);
  element.addEventListener("touchstart", pointerDown, { passive: false });
}

// Handle node click for connecting wires
function onNodeClick(e) {
  e.stopPropagation();
  const id = this.dataset.id;

  if (!selectedNodeId) {
    selectedNodeId = id;
    this.classList.add("selected");
    return;
  }

  if (selectedNodeId === id) {
    this.classList.remove("selected");
    selectedNodeId = null;
    return;
  }

  const fromId = selectedNodeId;
  const toId = id;
  const fromNode = circuitNodes[fromId];
  const toNode = circuitNodes[toId];
  if (!fromNode || !toNode) return;

  drawWire(fromId, toId, fromNode.el, toNode.el);

  fromNode.el.classList.remove("selected");
  selectedNodeId = null;

  recomputeCircuit();
}

// Draw a wire between two nodes (clickable, removable)
function drawWire(fromId, toId, fromEl, toEl) {
  const canvas = document.getElementById("circuitCanvas");
  if (!canvas) return;

  const rectCanvas = canvas.getBoundingClientRect();
  const r1 = fromEl.getBoundingClientRect();
  const r2 = toEl.getBoundingClientRect();

  const x1 = r1.left + r1.width / 2 - rectCanvas.left;
  const y1 = r1.top + r1.height / 2 - rectCanvas.top;
  const x2 = r2.left + r2.width / 2 - rectCanvas.left;
  const y2 = r2.top + r2.height / 2 - rectCanvas.top;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  const wire = document.createElement("div");
  wire.className = "wire";
  wire.dataset.from = fromId;
  wire.dataset.to = toId;
  wire.style.width = length + "px";
  wire.style.left = x1 + "px";
  wire.style.top = y1 + "px";
  wire.style.transform = `rotate(${angle}deg)`;

  // click -> remove wire
  wire.addEventListener("click", (e) => {
    e.stopPropagation();
    removeWire(wire);
  });

  // hover highlight (optional, if styled in CSS)
  wire.addEventListener("mouseenter", () => wire.classList.add("selected-wire"));
  wire.addEventListener("mouseleave", () => wire.classList.remove("selected-wire"));

  canvas.appendChild(wire);
  circuitEdges.push({ from: fromId, to: toId, el: wire });

  recomputeCircuit();
}

// Remove a wire and recompute circuit
function removeWire(wireEl) {
  const from = wireEl.dataset.from;
  const to = wireEl.dataset.to;

  wireEl.remove();

  const idx = circuitEdges.findIndex(
    (w) => w.from === from && w.to === to && w.el === wireEl
  );
  if (idx !== -1) {
    circuitEdges.splice(idx, 1);
  }

  recomputeCircuit();
}

// Update wires when a node moves
function updateWiresForNode(nodeId) {
  const canvas = document.getElementById("circuitCanvas");
  if (!canvas) return;
  const rectCanvas = canvas.getBoundingClientRect();
  const node = circuitNodes[nodeId];
  if (!node) return;

  const r1 = node.el.getBoundingClientRect();

  circuitEdges.forEach((edge) => {
    if (edge.from !== nodeId && edge.to !== nodeId) return;

    const otherId = edge.from === nodeId ? edge.to : edge.from;
    const otherNode = circuitNodes[otherId];
    if (!otherNode) return;

    const r2 = otherNode.el.getBoundingClientRect();

    const x1 = r1.left + r1.width / 2 - rectCanvas.left;
    const y1 = r1.top + r1.height / 2 - rectCanvas.top;
    const x2 = r2.left + r2.width / 2 - rectCanvas.left;
    const y2 = r2.top + r2.height / 2 - rectCanvas.top;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    edge.el.style.width = length + "px";
    edge.el.style.left = x1 + "px";
    edge.el.style.top = y1 + "px";
    edge.el.style.transform = `rotate(${angle}deg)`;
  });
}

// Toggle switch ON/OFF
function toggleSwitch(id) {
  const node = circuitNodes[id];
  if (!node) return;
  node.switchOn = !node.switchOn;
  node.el.classList.toggle("switch-on", node.switchOn);
  recomputeCircuit();
}

// Power flow logic: Battery -> ... -> LED through ON switch ⇒ LED glows
function recomputeCircuit() {
  Object.values(circuitNodes).forEach((n) => {
    if (n.type === "led") n.el.classList.remove("led-on");
  });

  const adj = {};
  Object.keys(circuitNodes).forEach((id) => {
    adj[id] = [];
  });

  circuitEdges.forEach((e) => {
    if (adj[e.from]) adj[e.from].push(e.to);
    if (adj[e.to]) adj[e.to].push(e.from);
  });

  const batteryIds = Object.values(circuitNodes)
    .filter((n) => n.type === "battery")
    .map((n) => n.id);
  if (!batteryIds.length) return;

  const visited = new Set();
  const queue = [];

  batteryIds.forEach((id) => {
    visited.add(id);
    queue.push(id);
  });

  while (queue.length) {
    const currentId = queue.shift();
    const node = circuitNodes[currentId];
    if (!node) continue;

    if (node.type === "switch" && !node.switchOn) continue;

    (adj[currentId] || []).forEach((nbr) => {
      if (!visited.has(nbr)) {
        visited.add(nbr);
        queue.push(nbr);
      }
    });
  }

  Object.values(circuitNodes).forEach((n) => {
    if (n.type === "led" && visited.has(n.id)) {
      n.el.classList.add("led-on");
    }
  });
}

// Clear selection + add default nodes on load (only on playzone page)
window.addEventListener("load", () => {
  const canvas = document.getElementById("circuitCanvas");
  if (!canvas) return;

  canvas.addEventListener("click", () => {
    if (!selectedNodeId) return;
    const node = circuitNodes[selectedNodeId];
    if (node) node.el.classList.remove("selected");
    selectedNodeId = null;
  });

  addNode("battery");
  addNode("resistor");
  addNode("led");
  addNode("switch");
});
// ========== RESOURCES PAGE HELPERS ========== //
function showResource(type) {
  const box = document.getElementById("resourceDetails");
  if (!box) return;

  let html = "";

  if (type === "pdf") {
    html = `
      <h3>📘 EEE PDF Notes</h3>
      <ul>
        <li class="resource-item">
          <a href="https://scet.ac.in/upload/syllabus_2025-26/CO/Group1/BTEL22101%20Basic%20Electrical%20Engineering.pdf" target="_blank">
            Basic Electrical Engineering – Lecture Notes
          </a>
        </li>
        <li class="resource-item">
          <a href="https://www.griet.ac.in/EEE_lecture_notes.pdf" target="_blank">
            Basic Electronics Engineering Notes (EEE)
          </a>
        </li>
        <li class="resource-item">
          <a href="https://archive.nptel.ac.in/courses/108/108/108108079/" target="_blank">
            NPTEL – Circuit Theory PDFs & Materials
          </a>
        </li>
      </ul>
    `;
  } else if (type === "yt") {
    html = `
      <h3>🎬 YouTube Tutorials</h3>
      <ul>
        <li class="resource-item">
          <a href="https://www.youtube.com/playlist?list=PL7987F30C41A9ADCB" target="_blank">
            Basic Electronics – NPTEL Playlist
          </a>
        </li>
        <li class="resource-item">
          <a href="https://www.youtube.com/watch?v=uXr4lXYjXuU" target="_blank">
            Electronics for Beginners – Overview
          </a>
        </li>
        <li class="resource-item">
          <a href="https://www.youtube.com/playlist?list=PLah6faXAgguOeMUIxS22ZU4w5nDvCl5gs" target="_blank">
            Complete Basic Electronics Course
          </a>
        </li>
      </ul>
    `;
  } else if (type === "tools") {
    html = `
      <h3>🛠️ Simulation & Practice Tools</h3>
      <ul>
        <li class="resource-item">
          <a href="https://www.tinkercad.com/circuits" target="_blank">
            TinkerCAD Circuits – Beginner Friendly
          </a>
        </li>
        <li class="resource-item">
          <a href="https://www.circuitverse.org/simulator" target="_blank">
            CircuitVerse – Digital Logic Simulator
          </a>
        </li>
        <li class="resource-item">
          <a href="https://easyeda.com/editor" target="_blank">
            EasyEDA – Online Circuit & PCB Design
          </a>
        </li>
      </ul>
    `;
  }

  box.innerHTML = html;
  box.classList.remove("hidden");
  box.scrollIntoView({ behavior: "smooth", block: "start" });
}
function submitFeedback() {
  const nameEl = document.getElementById("fbName");
  const emailEl = document.getElementById("fbEmail");
  const msgEl = document.getElementById("fbMessage");
  const statusEl = document.getElementById("fbStatus");

  if (!nameEl || !emailEl || !msgEl || !statusEl) return;

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const msg = msgEl.value.trim();

  if (!name || !email || !msg) {
    statusEl.textContent = "Please fill in all fields before submitting.";
    statusEl.style.color = "#f97373";
    return;
  }

  // For now just show success (no backend)
  statusEl.textContent = "Thank you for your feedback! 😊";
  statusEl.style.color = "#4ade80";

  // Clear fields
  nameEl.value = "";
  emailEl.value = "";
  msgEl.value = "";
}
