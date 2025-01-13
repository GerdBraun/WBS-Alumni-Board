import axios from "axios";

export const getMockAiAnswers = async ({question,token}) => {
  try {
    const payload = {
        "model": "gpt-4o",
        "messages": question
      }
    const response = await axios.post(
        `${import.meta.env.VITE_API_SERVER}/prompts`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
  } catch (error) {
   return error;
  }
}