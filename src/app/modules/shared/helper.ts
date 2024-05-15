export function createFileFromBlob(blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }