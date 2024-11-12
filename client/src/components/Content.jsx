import { useState } from "react"

const Content = () => {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const prompt =
    "Transform this text into ULTRA brain rot Gen Z speak. KEEP IT SHORT - match input length! Use max cringe: skibidi, bussin, fr fr, nah bc, based, no cap, slay, literally me, real, valid, sus, chad, ratio, W/L, HELP-, /srs, /j. Add emojis (💀😭✨️🔥) and keyboard smashing (PLSSS). Make it sound unhinged but KEEP IT BRIEF! Don't add extra context or explanations - just convert the input directly into brain rot speak."

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

  const formatText = (text) => {
    text = text.replace(/<\/?i>/g, '');
    return text.replace(/\*\*/g, '');
  };

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
          <div className="w-full min-h-[50px] bg-zinc-800 p-3 rounded-md border-2 border-pur">
            {formatText(outputText)}
          </div>
        </div>
      )}
    </section>
  )
}

export default Content
