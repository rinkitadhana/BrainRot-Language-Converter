import { useState } from "react"

const Content = () => {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const prompt =
    "Take this input text and transform it into peak Gen Z brain rot language. Use a mix of trending slang, chaotic internet culture references, and absurd humor. Incorporate words like sigma, Ohio, skibidi, rizz, sus, NPC, and giga chad. Add random Gen Z humor like ratio and meme catchphrases to make the output feel like it was straight from a chaotic TikTok comment section. Maintain the general meaning of the original text but deliver it with maximum absurdity."

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError("Please provide some text to convert.");
      return;
    }

    setIsLoading(true);
    setError("");
    setOutputText("");

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_GEMINI_API_ENDPOINT}?key=${import.meta.env.VITE_APP_GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${prompt}\n${inputText}`
            }]
          }]
        }),
      });

      if (!response.ok) {
        setError("Failed to generate text, please try again.");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        setOutputText(data.candidates[0].content.parts.map(part => part.text).join(''));
      } else {
        setError("No text was generated.");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex flex-col gap-4 mt-6 px-3 md:px-0">
      <div className="flex justify-center">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="bg-zinc-800 text-lg h-[120px] w-full border-2 border-pur rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-neon resize-y"
          placeholder="Enter text here..."
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button
          disabled={isLoading}
          onClick={handleGenerate}
          className="text-neon cursor-pointer text-lg font-semibold border-2 py-2 px-3 rounded-full border-pur hover:bg-pur transition-all"
        >
          {isLoading ? "Generating..." : "Generate✨"}
        </button>
      </div>
      {error && (
        <div className="flex justify-center">
          <h1 className="border-2 rounded-xl border-red-300 text-red-300 py-2 px-4">
            {error}
          </h1>
        </div>
      )}
      {outputText && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium">Text Generated 👇</h2>
          <div className="w-full min-h-[50px] bg-zinc-800 p-3 rounded-md focus:outline-none resize-y">
            {outputText}
          </div>
        </div>
      )}
    </section>
  )
}

export default Content
