import axios from "axios";

export const transformImageToText = async (image: string) => {
  // LLM Model: "@cf/llava-hf/llava-1.5-7b-hf"

  // TODO: uncomment this when the API is ready
  // const url = import.meta.env.VITE_IMAGE_ANALYSIS_API;
  const url = "/api";

  const response = await axios.post(
    url,
    {
      image,
      prompt:
        "I've got a receipt. Can you list all the items and their respective prices and quantities in json format",
      max_tokens: 512,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("response", response.data);
  return response.data;
};
