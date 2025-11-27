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
      document.getElementById("chatInput").focus();
    }, 100);
  }
}

// ========== CHATBOT LOGIC ========== //

// Predefined Q&A (rule-based AI style)
const knowledgeBase = [
  {
    keywords: ["resistor", "resistance"],
    answer:
      "A resistor is a component that limits the flow of electric current. It is used for current limiting, voltage division, and biasing. Its unit is Ohm (Ω)."
  },
  {
    keywords: ["ohm", "ohms law", "ohm's law", "ohms"],
    answer:
      "Ohm’s law states that V = I × R, where V is voltage, I is current, and R is resistance. If you know any two, you can calculate the third."
  },
  {
    keywords: ["capacitor", "capacitance"],
    answer:
      "A capacitor stores electrical energy in an electric field. It is used in filtering, timing circuits, coupling/decoupling, and energy storage. Its unit is Farad (F)."
  },
  {
    keywords: ["diode", "rectifier"],
    answer:
      "A diode allows current to flow only in one direction. It is used for rectification (AC to DC), protection, clamping, and switching."
  },
  {
    keywords: ["transistor", "bjt", "mosfet", "switch", "amplifier"],
    answer:
      "A transistor works as an electronic switch or amplifier. In digital circuits it turns signals ON/OFF, and in analog circuits it amplifies weak signals."
  },
  {
    keywords: ["ic", "integrated circuit", "chip"],
    answer:
      "An IC (Integrated Circuit) is a complete circuit fabricated on a small chip, containing many transistors, resistors, and other components. Examples: 555 timer, op-amp 741, microcontrollers."
  },
  {
    keywords: ["arduino", "microcontroller"],
    answer:
      "Arduino is a popular open-source microcontroller platform used for prototyping and learning embedded systems. It reads inputs (sensors) and controls outputs (LEDs, motors, etc.)."
  },
  {
    keywords: ["ac", "dc", "difference"],
    answer:
      "AC (Alternating Current) changes its direction and magnitude periodically (mains supply). DC (Direct Current) flows in one direction with nearly constant magnitude (battery)."
  },
  {
    keywords: ["led", "light emitting diode"],
    answer:
      "An LED is a Light Emitting Diode that produces light when current flows through it. It is energy efficient and used for indication and lighting."
  },
  {
    keywords: ["ohm", "calculate", "current", "voltage"],
    answer:
      "Example using Ohm’s law: If R = 10Ω and V = 5V, then current I = V / R = 5 / 10 = 0.5A."
  },
  {
    keywords: ["help", "what can you do", "how to use"],
    answer:
      "You can ask me things like:\n• What is a resistor?\n• Explain Ohm’s law\n• Difference between AC and DC\n• What is Arduino?\n• What is a capacitor used for?"
  }
];

function findAnswer(userText) {
  const text = userText.toLowerCase();

  for (const item of knowledgeBase) {
    for (const key of item.keywords) {
      if (text.includes(key)) {
        return item.answer;
      }
    }
  }

  // Fallback generic reply
  return (
    "I’m not fully trained on that question yet 😅.\n" +
    "Try asking about basic electronics like resistors, capacitors, Ohm’s law, diodes, transistors, AC/DC, or Arduino."
  );
}

function appendMessage(text, sender = "bot") {
  const container = document.getElementById("chatbotBody");
  const msgDiv = document.createElement("div");

  msgDiv.classList.add("message");
  if (sender === "user") {
    msgDiv.classList.add("user-msg");
  } else {
    msgDiv.classList.add("bot-msg");
  }

  msgDiv.textContent = text;
  container.appendChild(msgDiv);

  // Auto-scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;

  appendMessage(text, "user");
  input.value = "";

  // Typing indicator
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
