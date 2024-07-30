export const parseImageTextToJson = (text: string) => {
  const jsonRegex = /```json([\s\S]*?)```/;
  const match = text.match(jsonRegex);

  if (match && match[1]) {
    const jsonString = match[1].trim(); // Extract and trim the JSON string
    return jsonString;
  }

  return null;
};
