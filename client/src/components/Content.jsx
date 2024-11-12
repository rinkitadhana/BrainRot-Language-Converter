import { useState } from "react"

const Content = () => {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const prompt =
    "[INST] Convert the following text into Gen Z language, using slang, abbreviations, and a casual tone. Only return the converted text without any additional text or explanations:"
  const HF_TOKEN = "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"

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError("Please provide some text to convert.")
      return
    }

    setIsLoading(true)
    setError("")
    setOutputText("")

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-chat-hf",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `System: You are a Gen Z translator. Convert the input to Gen Z slang. Only output the converted text.
Human: Here's the text to convert: ${inputText}
Assistant: `,
            options: {
              wait_for_model: true,
              max_length: 512,
            },
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setOutputText(
        Array.isArray(data) ? data[0].generated_text : data.generated_text
      )
    } catch (err) {
      setError(`Error generating text: ${err.message}`)
      console.error("Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className=" flex flex-col gap-4 mt-6 px-3 md:px-0  ">
      <div className=" flex justify-center">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className=" bg-zinc-800 text-lg h-[200px] w-full border-2 border-pur  rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-neon resize-y"
          placeholder="Enter text here..."
        ></textarea>
      </div>
      <div className=" flex justify-center">
        <button
          onClick={handleGenerate}
          className=" text-neon cursor-pointer text-lg font-semibold border-2 py-2 px-3 rounded-full border-pur hover:bg-pur transition-all  "
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>
      {error && (
        <div className=" flex justify-center ">
          <h1 className="border-2 rounded-xl border-red-300 text-red-300 py-2 px-4">
            {error}
          </h1>
        </div>
      )}
      {outputText && (
        <div className=" flex flex-col gap-4">
          <h2 className=" text-xl font-medium">Text Generated 👇</h2>
          <textarea
            id="outputText"
            value={outputText}
            className=" w-full h-[200px] bg-zinc-800 p-3 rounded-md focus:outline-none resize-y"
            readOnly
          ></textarea>
        </div>
      )}
    </section>
  )
}

export default Content
