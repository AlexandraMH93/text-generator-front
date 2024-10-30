import api from "./config"


export const createUserPrompt = async (promptData) => {
  try {
    const { data } = await api.post('/user/promptAndTextGenerated', promptData, {
      headers: { Authorization: localStorage.getItem("token")},
    })
    return data
  } catch (error) {
    throw error
  }
}

export const getUserPromptHistory = async () => {
  try {
    const { data } = await api.get('/user/history', {
      headers: { Authorization: localStorage.getItem("token") },
    })
    return data
  } catch (error) {
    throw error
  }
}
