export const base64ToBlob = (
  base64String: string,
  contentType: string = "image/jpeg"
): Blob => {
  // Extract the base64 data from the full string if it includes the data URI prefix
  const base64Data = base64String.includes("base64,")
    ? base64String.split("base64,")[1]
    : base64String;

  const byteCharacters: string = atob(base64Data);
  const byteArrays: Uint8Array[] = [];

  for (let offset: number = 0; offset < byteCharacters.length; offset += 512) {
    const slice: string = byteCharacters.slice(offset, offset + 512);
    const byteNumbers: number[] = new Array(slice.length);

    for (let i: number = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray: Uint8Array = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};
