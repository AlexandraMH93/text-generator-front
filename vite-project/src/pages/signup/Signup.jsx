import { useState } from "react"
import { signUp } from "../../services/authService"
import { Link, useNavigate } from "react-router-dom"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

const SignUp = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [secondLastname, setSecondLastname] = useState("")
  const [gender, setGender] = useState("")
  const [birthDate, setbirthDate] = useState(null)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSignup = async () => {
    const userData = {
      firstName: firstname,
      lastName: lastname,
      secondLastName: secondLastname,
      birthDate: birthDate ? birthDate.format("YYYY-MM-DD") : "",
      gender: gender,
      phone: phone,
      email: email,
      password: password
    }

    try {
      const res = await signUp(userData)
      localStorage.setItem("token", res.token)
      navigate("/")
    } catch (error) {
      console.error("Error al registrarse:", error)
    }
  };

  return (
    <div className="flex justify-center items-center  text-gray-800 text-xl">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-4">Registrarse</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            className="border p-3 rounded-md w-full"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="1º Apellido"
            className="border p-3 rounded-md w-full"
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="text"
            placeholder="2º Apellido"
            className="border p-3 rounded-md w-full"
            onChange={(e) => setSecondLastname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-md w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border p-3 rounded-md w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Teléfono"
            className="border p-3 rounded-md w-full"
            onChange={(e) => setPhone(e.target.value)}
          />
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de nacimiento"
              onChange={(e) => setbirthDate(e)}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <div className="border p-3 rounded-md w-full flex items-center">
                  <input ref={inputRef} {...inputProps} className="w-full outline-none" placeholder="Fecha de nacimiento" />
                  {InputProps?.endAdornment}
                </div>
              )}
            />
          </LocalizationProvider>

          <select
            className="border p-3 rounded-md w-full"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option value="">Género</option>
            <option value="Female">Femenino</option>
            <option value="Male">Masculino</option>
            <option value="Undefined">Indefinido</option>
            <option value="Nonbinary">No binario</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Link to="/">
            <button className="px-4 py-2 text-primary rounded border-2 border-primary hover:bg-primary hover:text-text">
              Cancelar
            </button>
          </Link>
          <button
            onClick={handleSignup}
            className="px-4 py-2 text-secondary border-2 border-secondary hover:text-text rounded hover:bg-secondary"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
