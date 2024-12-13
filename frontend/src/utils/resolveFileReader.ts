export const resolveFileReader = (
  file: File,
  callback?: (base64String: string) => void
) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = async () => {
    const base64String = reader.result as string;

    if (callback) {
      callback(base64String);
    }
  };
};
