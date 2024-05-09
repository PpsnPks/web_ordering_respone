export function removeEmpty(obj: any) {
  Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') {
          removeEmpty(obj[key]);
      } else if (obj[key] === null || obj[key] === '') {
          delete obj[key];
      }
  });
  return obj;
}

export function createFileFromBlob(blob: Blob) {
  const url = window.URL.createObjectURL(blob);
  window.open(url);
}
