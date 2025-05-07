// Tina Call Center UI Prototype
import React, { useRef, useState } from "react";

const scenarios = [
  "Urgent Supply Request",
  "Test Result Callback",
  "Notify of Loved One’s Passing",
  "Emotional Support Request"
];

export default function TinaDemo() {
  const fullCallAudio = useRef(null);
  const [selectedScenario, setSelectedScenario] = useState("Urgent Supply Request");

  const now = new Date();
  const formattedDate = now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  const playAudio = () => {
    if (fullCallAudio.current) {
      fullCallAudio.current.currentTime = 0;
      fullCallAudio.current.play();
    }
  };

  const transcripts = {
    "Urgent Supply Request": [
      { speaker: "Caller", text: "I'm calling because we are out of my mother's feeding bags, and need to get some sent to the house today, please." },
      { speaker: "Tina", text: "I understand how important it is to have those feeding bags for your mother's care. I'm so sorry you are dealing with this right now and I want to make sure we get this resolved for you as quickly as possible." },
      { speaker: "Tina", text: "Let me gather a little information so I can notify the on-call nurse right away. May I have your name please?" }
    ],
    "Test Result Callback": [
      { speaker: "Caller", text: "My mother had a CBC test done yesterday morning and I need to know what the results are." },
      { speaker: "Tina", text: "I understand how important it is to have those results. Let me gather some information so I can assist you. May I have your name, please?" },
      { speaker: "Caller", text: "Wayne Smith." },
      { speaker: "Tina", text: "Thank you for confirming Wayne. And the patient’s name is Mary Smith, correct?" },
      { speaker: "Caller", text: "Yes" },
      { speaker: "Tina", text: "Here’s what I’ll do: I’ll notify the appropriate care team member, and they will call you back on the next business day to provide an update on the CBC test results. Is there anything else I can assist you with right now?" }
    ],
    "Notify of Loved One’s Passing": [
      { speaker: "Caller", text: "My father just passed away." },
      { speaker: "Tina", text: "I am so deeply sorry for your loss. I can only imagine how difficult this moment must be for you. Please know that you are not alone, and I’m here to help you through this. May I ask for your father's name, please?" },
      { speaker: "Caller", text: "Alan Jones" },
      { speaker: "Tina", text: "I am notifying the on-call nurse immediately so they can provide the support and guidance you need during this time. Is there anything else I can assist you with while we wait for the nurse to reach out?" }
    ],
    "Emotional Support Request": [
      { speaker: "Caller", text: "I’m feeling overwhelmed and just need someone to talk to." },
      { speaker: "Tina", text: "I’m so sorry to hear that you’re feeling this way. It sounds like you’re carrying a lot right now, and I want you to know that you’re not alone. I’ll notify the on-call nurse right away so they can help coordinate support from a social worker or chaplain for you. Can I please get your name?" }
    ]
  };

  const insights = {
    "Urgent Supply Request": [
      "Detected urgent supply request for feeding bags",
      "Replied with an empathetic tone based on the situation and the caller's tone",
      "Initiated protocol to gather caller details",
      "Escalation to On-Call Nurse triggered"
    ],
    "Test Result Callback": [
      "Recognized request for CBC test result update",
      "Informed caller of next business day callback",
      "Sent callback request to care team with summary of call"
    ],
    "Notify of Loved One’s Passing": [
      "Detected end-of-life notification",
      "Responded with deep empathetic and emotional response",
      "Immediate notification of on-call nurse",
      "Flagged for bereavement support follow-up"
    ],
    "Emotional Support Request": [
      "Detected emotional distress tone",
      "Routed for emotional support callback",
      "Logged interaction for care coordination"
    ]
  };

  const currentTranscript = transcripts[selectedScenario] || [];
  const currentInsights = insights[selectedScenario] || [];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-800">Tina – AI Call Center Assistant</h1>
        <p className="text-lg text-gray-600 italic mt-2 font-bold">Empathy. Emotion. Engagement.</p>
        <div className="mt-2 w-full h-12 bg-white shadow-sm relative overflow-hidden flex items-center rounded-md">
          <div className="absolute whitespace-nowrap animate-marquee text-lg text-blue-700">
            Reduces staff burnout&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;Multilingual support&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;Empathetic, natural-flowing conversations&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;Automatically logs every call&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;Improves after-hours coverage&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;Supports emotional and bereavement needs&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;Summarizes call intent for staff&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;HIPAA-compliant&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;Healthcare-aware context&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;Real-time escalation to on-call staff
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Call Simulator */}
        <div className="bg-white p-4 rounded-lg shadow-md h-full">
          <h2 className="text-xl font-semibold mb-2">Call Simulation – {selectedScenario}</h2>

          <div className="mb-4">
            <button onClick={playAudio} className="bg-blue-700 text-white px-4 py-2 rounded text-sm">
              ▶️ Play Call Simulation
            </button>
          </div>

          <audio
            ref={fullCallAudio}
            src={
              selectedScenario === "Urgent Supply Request"
                ? "/urgent-supply.mp3"
                : selectedScenario === "Test Result Callback"
                ? "/test-results.mp3"
                : selectedScenario === "Notify of Loved One’s Passing"
                ? "/loved-one-passing.mp3"
                : selectedScenario === "Emotional Support Request"
                ? "/emotional-support.mp3"
                : ""
            }
          />

          <div className="bg-gray-100 p-2 h-64 overflow-y-auto rounded-lg border text-lg mt-4">
            {currentTranscript.length > 0 ? (
              currentTranscript.map((line, index) => (
                <p key={index}><strong>{line.speaker}:</strong> {line.text}</p>
              ))
            ) : (
              <p className="italic text-gray-500">No transcript available for this scenario.</p>
            )}
          </div>

          {/* AI Call Summary (dynamic) */}
          <div className="mt-4 bg-white border border-gray-300 p-4 rounded-lg shadow-sm text-sm">
            <h3 className="text-lg font-semibold mb-2">AI Call Summary</h3>

            {selectedScenario === "Urgent Supply Request" && (
              <>
                <p><strong>Caller Name:</strong> Wayne Smith</p>
                <p><strong>Callback Number:</strong> (615) 351-1785</p>
                <p><strong>Patient Name:</strong> Mary Smith</p>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Time:</strong> {formattedTime}</p>
                <p className="mt-2"><strong>Summary:</strong> Caller reported they were out of feeding bags. Tina responded empathetically, gathered necessary details, and notified the on-call nurse for urgent delivery coordination.</p>
              </>
            )}

            {selectedScenario === "Test Result Callback" && (
              <>
                <p><strong>Caller Name:</strong> Wayne Smith</p>
                <p><strong>Callback Number:</strong> (615) 351-1785</p>
                <p><strong>Patient Name:</strong> Mary Smith</p>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Time:</strong> {formattedTime}</p>
                <p className="mt-2"><strong>Summary:</strong> Caller requested an update on CBC test results. Tina acknowledged the importance, verified details, and documented the request. Action taken: Notified the care team for next business day follow-up.</p>
              </>
            )}

            {selectedScenario === "Notify of Loved One’s Passing" && (
              <>
                <p><strong>Caller Name:</strong> Alice Jones</p>
                <p><strong>Callback Number:</strong> (615) 351-1785</p>
                <p><strong>Patient Name:</strong> Alan Jones</p>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Time:</strong> {formattedTime}</p>
                <p className="mt-2"><strong>Summary:</strong> Caller reported the death of a loved one. Tina responded with compassion, expressed condolences, and immediately notified the on-call nurse and bereavement team.</p>
              </>
            )}

            {selectedScenario === "Emotional Support Request" && (
              <>
                <p><strong>Caller Name:</strong> Wayne Smith</p>
                <p><strong>Callback Number:</strong> (615) 351-1785</p>
                <p><strong>Patient Name:</strong> Mary Smith</p>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Time:</strong> {formattedTime}</p>
                <p className="mt-2"><strong>Summary:</strong> Caller expressed emotional distress and the need for someone to talk to. Tina responded supportively and coordinated follow-up from a social worker or chaplain via the on-call nurse.</p>
              </>
            )}
          </div>
        </div>

        {/* AI Dashboard */}
        <div className="bg-white p-4 rounded-lg shadow-md h-full">
          <h2 className="text-xl font-semibold mb-2">Tina's AI Insights</h2>
          <ul className="list-disc ml-5 text-gray-700 text-lg">
            {currentInsights.length > 0 ? (
              currentInsights.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <li className="italic text-gray-500">No insights available for this scenario.</li>
            )}
          </ul>
          <div className="mt-4 bg-blue-50 p-2 rounded text-lg">
            <strong>Why?</strong> Tina responded based on structured protocols matched to scenario keywords and tone.
          </div>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {scenarios.map((label) => (
          <button
            key={label}
            onClick={() => setSelectedScenario(label)}
            className={`px-4 py-2 rounded text-sm transition ${
              selectedScenario === label
                ? "bg-blue-800 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
