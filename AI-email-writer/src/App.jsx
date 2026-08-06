import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const generateEmail = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/writeEmail", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt,
          tone,
        }),
      });

      const data = await res.json();

      setEmail(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-2 text-black">AI Email Writer</h1>

        <p className="text-gray-500 mb-8">
          Generate professional emails using AI.
        </p>

        <textarea
          rows={5}
          placeholder="Describe the email you want..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full border rounded-xl p-4 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between items-center mb-6">
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option>Professional</option>
            <option>Friendly</option>
            <option>Formal</option>
            <option>Casual</option>
            <option>Persuasive</option>
          </select>

          <button
            onClick={generateEmail}
            disabled={loading || !prompt}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Email"}
          </button>
        </div>

        <div className="relative">
          <textarea
            value={email}
            readOnly
            rows={12}
            placeholder="Generated email will appear here..."
            className="w-full border rounded-xl p-4 bg-gray-50 resize-none"
          />

          {email && (
            <button
              onClick={copyEmail}
              className="absolute top-3 right-3 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm"
            >
              Copy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
