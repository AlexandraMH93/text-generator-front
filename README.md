# Generador de Texto con IA simulado - Frontend

Este proyecto frontend está construido en **React** y **Vite**. Se conecta con una **API en Express** para interactuar con una base de datos y simular un generador de texto con inteligencia artificial. Los usuarios pueden registrarse, iniciar sesión y generar texto basado en un prompt y otras configuraciones.

![image](https://github.com/user-attachments/assets/6f1a83b7-368b-4a57-aa7e-9b6e0bc8d29f)


## Índice

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación y Configuración](#instalación-y-configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Endpoints del Backend](#endpoints-del-backend)
- [Licencia](#licencia)


## Características

- **Registro e Inicio de Sesión**: Permite a los usuarios registrarse e iniciar sesión.
- **Generador de Texto**: Acepta un prompt y devuelve un texto generado aleatoriamente.
- **Historial de Prompts**: Muestra el historial de prompts y textos generados.
- **Configuraciones**: Los usuarios pueden ajustar opciones como la longitud máxima del texto y temperature, es decir, creatividad.

## Tecnologías

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Express (API separada)
- **Base de Datos**: La API se conecta a una base de datos MySQL, https://text-generator-api.onrender.com.
- **Autenticación**: Tokens de autenticación para proteger el acceso a rutas específicas

## Instalación y Configuración

1. **Clona el Repositorio:**
   ```bash
   git clone [(https://github.com/username/text-generator-front.git)]
   cd vite-project
   ```
2. **Instala las dependencias:**

    ```bash
    npm install
    ```
3. **Inicia el proyecto:**

    ```bash
    npm run dev
    ```
## Endpoints del Backend

Estos son los endpoints principales que se utilizan para interactuar con la API:
- **POST /auth/signUp**: Registro de un nuevo usuario.
- **POST /auth/login**: Inicio de sesión y generación de token.
- **POST /user/promptAndTextGenerated**: Envía un prompt y genera un texto aleatorio según las configuraciones.
- **GET /user/history**: Recupera el historial de prompts y textos generados del usuario actual.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

## Enlace a la app

https://text-generator-front.vercel.app/

    
