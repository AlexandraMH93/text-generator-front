import { useState } from "react"
import { genericTexts } from "../../data/arrayTexts.js"
import { Alert } from "@mui/material"
import { createUserPrompt } from "../../services/userService.js"
import { getUserPromptHistory } from "../../services/userService.js"

const Dashboard = () => {
  const [prompt, setPrompt] = useState("")
  const [temperature, setTemperature] = useState("")
  const [maxLength, setMaxLength] = useState("")
  const [generatedText, setGeneratedText] = useState(null)
  const [history, setHistory] = useState([])
  const [error, setError] = useState(null)
  
  const [promptError, setPromptError] = useState(null)
  const [temperatureError, setTemperatureError] = useState(null)
  const [maxLengthError, setMaxLengthError] = useState(null)

  const handleSubmit = async () => {
    let hasError = false

    if (!prompt) {
      setPromptError("Prompt obligatorio")
      hasError = true
    } else {
      setPromptError(null)
    }

    if (temperature === "") {
      setTemperatureError("Temperature obligatorio")
      hasError = true
    } else if (isNaN(temperature) || temperature < 0 || temperature > 1) {
      setTemperatureError("Temperature debe ser un valor entre 0 y 1")
      hasError = true
    } else {
      setTemperatureError(null)
    }

    const maxLen = parseInt(maxLength, 10)
    if (maxLength === "") {
      setMaxLengthError("El campo maxLength no puede estar vacío")
      hasError = true
    } else if (isNaN(maxLen) || maxLen < 10 || maxLen > 1000) {
      setMaxLengthError("MaxLength debe ser un valor entre 10 y 1000")
      hasError = true
    } else {
      setMaxLengthError(null)
    }

    if (hasError) {
      setError("Revisa todos los campos")
      return
    }

    const filteredTexts = genericTexts.filter((text) => text.length <= maxLen)
    
    if (filteredTexts.length > 0) {
      const randomText = filteredTexts[Math.floor(Math.random() * filteredTexts.length)]
      setGeneratedText(randomText)
      setError(null)

      try {
        await createUserPrompt({
          textPrompt: prompt,
          textGenerated: randomText,
        })
      } catch (err) {
        console.error("Error al enviar datos al backend:", err.response?.data || err.message)
        setError(err.response?.data || "Error al guardar el prompt y texto generado.")
      }      
  }
  }

  const handleGetHistory = async () => {
    try {
      const data = await getUserPromptHistory()
      setHistory(data)
      setError(null)
    } catch (err) {
      console.error("Error al obtener el historial:", err.response?.data || err.message)
      setError("Error al obtener el historial.")
    }
  }
  

  return (
    <div className="flex flex-col items-center justify-center text-gray-700 p-6">
      <h1 className="text-2xl text-text font-bold mb-4">Generador de Texto</h1>

      <input
        type="text"
        placeholder="Escribe tu prompt aquí"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md mb-2 focus:outline-none focus:border-blue-500"
      />
      {promptError && <p className="text-red-500 text-sm">{promptError}</p>}

      <input
        type="number"
        min="0"
        max="1"
        step="0.1"
        placeholder="Temperature (0 - 1)"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md mb-2 focus:outline-none focus:border-blue-500"
      />
      {temperatureError && <p className="text-red-500 text-sm">{temperatureError}</p>}

      <input
        type="number"
        min="10"
        max="1000"
        placeholder="Máxima longitud del texto (10 - 1000)"
        value={maxLength}
        onChange={(e) => setMaxLength(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md mb-2 focus:outline-none focus:border-blue-500"
      />
      {maxLengthError && <p className="text-red-500 text-sm">{maxLengthError}</p>}

      <div className="flex flex-row gap-4 mt-6">
      <button
        onClick={handleSubmit}
        className=" text-primary border-2 border-primary px-4 py-2 rounded-md hover:bg-primary hover:text-text  mt-4"
      >
        Generar Texto
      </button>

      <button
        onClick={handleGetHistory}
        className="text-secondary border-2 border-secondary px-4 py-2 rounded-md hover:bg-secondary hover:text-text  mt-4"
      >
        Ver Historial
      </button>
      </div>
      

      {error && (
        <Alert severity="error" className="mt-4 w-full max-w-md">
          {error}
        </Alert>
      )}

      {generatedText && (
        <div className="mt-6 p-4 bg-slate-100 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-lg font-semibold">Texto Generado:</h2>
          <p className="mt-2">{generatedText}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-6 p-4 bg-slate-200 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-lg font-semibold">Historial de Prompts</h2>
          <ul className="list-disc pl-4 mt-2">
            {history.map((item, index) => (
              <li key={index} className="mb-2">
                <strong>Prompt:</strong> {item.textPrompt}
                <br />
                <strong>Texto Generado:</strong> {item.textGenerated ? item.textGenerated.textGenerated : "No disponible"}
              </li>
            ))}
          </ul>
        </div>
      )}


    </div>
  )
}


export default Dashboard
