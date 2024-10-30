import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../services/authService"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [alert, setAlert] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async () => {
    const res = await login({ email, password })

    if (res) {
      console.log(res)
      localStorage.setItem('token', res.token)
      navigate('/dashboard')
    } else {
      setAlert(true)
    }
  };

  return (
    <div className="flex justify-center items-center m-y-auto max-h-screen w-full text-gray-800 text-sm lg:text-xl">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className=" text-xl lg:text-3xl font-bold text-center mb-4">Iniciar sesión</h2>

        {alert && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
            <p>El email o la contraseña no es correcto</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Contraseña</label>
            <div className="relative">
              <input
                type={isPassVisible ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-md pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>

              </span>
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 "
                onClick={() => setIsPassVisible(!isPassVisible)}
              >
                {isPassVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={handleLogin}
            className="w-full text-secondary border-2 border-secondary py-2 rounded-md hover:bg-secondary hover:text-text"
          >
            Login
          </button>
          <div className="text-center text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
