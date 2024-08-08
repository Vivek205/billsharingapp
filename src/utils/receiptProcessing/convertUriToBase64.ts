export const convertUriToBase64 = async (uri: string): Promise<string> => {
    try {
      // Fetch the file from the URI
      const response = await fetch(uri);
      const blob = await response.blob();
  
      // Create a new FileReader instance
      const reader = new FileReader();
  
      return new Promise((resolve, reject) => {
        // Define the onload event to resolve the promise with the Base64 string
        reader.onloadend = () => {
          resolve((reader.result as string).split(',')[1]);
        };
  
        // Define the onerror event to reject the promise in case of an error
        reader.onerror = (error) => {
          reject(error);
        };
  
        // Read the blob as a Data URL (Base64)
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting URI to Base64:', error);
      throw error;
    }
  };
  
//   // Usage example
//   convertUriToBase64('https://example.com/image.jpg')
//     .then((base64String) => {
//       console.log('Base64 String:', base64String);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });