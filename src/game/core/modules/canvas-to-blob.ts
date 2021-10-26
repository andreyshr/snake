interface ICanvasToBlob {
  getFile(): Blob;
}

export class CanvasToBlob implements ICanvasToBlob {
  constructor(private canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  getFile(): Blob {
    const dataURL = this.canvas.toDataURL();
    const blobBin = atob(dataURL.split(",")[1]);
    const array = [];
    for (let i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/png" });
  }
}
