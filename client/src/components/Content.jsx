import { useState } from "react"

const Content = () => {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const API_KEYS = [
    import.meta.env.VITE_APP_GEMINI_API_KEY,
    import.meta.env.VITE_APP_GEMINI_API_KEY_2,
    import.meta.env.VITE_APP_GEMINI_API_KEY_3,
    import.meta.env.VITE_APP_GEMINI_API_KEY_4
  ];
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [error, setError] = useState("")
  const prompt =
    "You are a language converter that transforms normal text into ULTRA brain rot Gen Z speak. KEEP IT SHORT - match input length! Convert the input directly, don't add explanations. Use max cringe: skibidi, bussin, fr fr, nah bc, based, no cap, slay, literally me, real, valid, sus, chad, ratio, W/L, HELP-, /srs, /j. Add little emojis and keyboard smashing (PLSSS) and excessive punctuation!!! Make it sound unhinged but BRIEF. Remember, you're CONVERTING language, not explaining or expanding."

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError("Please provide some text to convert.");
      return;
    }

    setIsLoading(true);
    setError("");
    setOutputText("");

    let apiKeyExhausted = true;
    let attempts = 0;

    while (apiKeyExhausted && attempts < API_KEYS.length) {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_GEMINI_API_ENDPOINT}?key=${API_KEYS[currentKeyIndex]}`, {
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

        if (response.status === 403) {
          setCurrentKeyIndex((prevIndex) => (prevIndex + 1) % API_KEYS.length);
          attempts++;
        } else if (!response.ok) {
          setError("Failed to generate text, please try again.");
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          apiKeyExhausted = false;
          const data = await response.json();
          if (data.candidates && data.candidates.length > 0) {
            setOutputText(data.candidates[0].content.parts.map(part => part.text).join(''));
          } else {
            setError("No text was generated.");
          }
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
        console.error("Error:", err);
        apiKeyExhausted = false; // Exit the loop on non-quota errors
      }
    }

    if (attempts === API_KEYS.length) {
      setError("All API keys have been exhausted. Please try again later.");
    }

    setIsLoading(false);
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
