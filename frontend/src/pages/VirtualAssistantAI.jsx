import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import "./css/VirtualAssistant.css";

function AssistantModel() {
  const { scene } = useGLTF("/models/assistant.glb");
  const modelRef = useRef(null);
  const baseY = useRef(0);

  useEffect(() => {
    if (modelRef.current) {
      baseY.current = modelRef.current.position.y;
    }
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.position.y = baseY.current + Math.sin(t) * 0.2;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[2.5, 2.5, 2.5]}
      rotation={[0, Math.PI + 3.1, 0]}
      position={[0, -1, 0]}
    />
  );
}

export default function VirtualAssistantUnified() {
  const [messages, setMessages] = useState([]);
  const [lastBotQuestion, setLastBotQuestion] = useState(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        text: "Hello! Welcome to HealthBridge Virtual Assistant. Where in the body is the problem?",
        sender: "bot",
        type: "options",
        options: [
          "Head", "Chest", "Stomach", "Back", "Legs", "Arms", "Eyes", "Ears",
          "Teeth", "Skin", "Throat", "Lungs", "Heart", "Kidneys", "Liver", "Other"
        ],
      },
    ]);
    setLastBotQuestion("location");
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOptionSelect = (option) => {
    setMessages((prev) => [...prev, { text: option, sender: "user", type: "text" }]);

    if (lastBotQuestion === "location") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "What is the problem?", sender: "bot", type: "text" },
          {
            text: "What is the problem?",
            sender: "bot",
            type: "options",
            options: [
              "Pain", "Headache", "Laziness", "Nausea", "Fatigue", "Dizziness", "Fever",
              "Swelling", "Coughing", "Bleeding", "Weakness", "Shortness of Breath", "Other",
            ],
          },
        ]);
        setLastBotQuestion("symptom");
      }, 500);
    } else if (lastBotQuestion === "symptom") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "How long has the problem been going on?", sender: "bot", type: "text" },
          {
            text: "How long has the problem been going on?",
            sender: "bot",
            type: "options",
            options: ["Less than a day", "1-3 days", "A week", "More than a week"],
          },
        ]);
        setLastBotQuestion("duration");
      }, 500);
    } else if (lastBotQuestion === "duration") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Processing your responses...", sender: "bot", type: "text" },
        ]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              text: "Based on your responses, we recommend Dr. Haider (General Physician).",
              sender: "bot",
              type: "recommendation",
              doctor: {
                name: "Dr. Haider",
                specialty: "General Physician",
                profileLink: "/appointment/67041a2c85d647ab4b181d1a",
              },
            },
          ]);
        }, 2000);
      }, 500);
    }
  };

  return (
    <div className="unified-container bg-white">
      <div className="assistant-wrapper">
        {/* 3D Model on Left */}
        <div className="assistant-sidebar">
          <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
            <ambientLight intensity={0.4} />
            <directionalLight intensity={1} position={[5, 5, 5]} />
            <Suspense fallback={null}>
              <Environment preset="city" />
              <OrbitControls enableZoom={false} />
              <AssistantModel />
            </Suspense>
          </Canvas>
        </div>

        {/* Chat Box */}
        <div className="assistant-chat-box">
          <div className="chat-header text-blue-600 text-xl font-bold">Virtual Assistant</div>

          {/* Messages Area */}
          <div className="messages-area" ref={messagesRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`bubble ${msg.sender === "user" ? "bubble-user" : "bubble-bot"}`}>
                <p>{msg.text}</p>
                {msg.options && (
                  <div className="options-row">
                    {msg.options.map((opt, idx) => (
                      <button key={idx} className="option-btn" onClick={() => handleOptionSelect(opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {msg.type === "recommendation" && (
                  <div className="bg-blue-600 p-3 rounded-lg mt-2">
                    <p>{msg.text}</p>
                    <a href={msg.doctor.profileLink} className="block mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                      View {msg.doctor.name}'s Profile
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
