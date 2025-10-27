import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Canvas のモック
HTMLCanvasElement.prototype.getContext = vi.fn(() => {
  return {
    fillStyle: '',
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    getImageData: vi.fn(() => ({
      data: new Uint8ClampedArray(4),
      width: 1,
      height: 1,
    })),
    putImageData: vi.fn(),
    createImageData: vi.fn(() => ({
      data: new Uint8ClampedArray(4),
      width: 1,
      height: 1,
    })),
    setTransform: vi.fn(),
    drawImage: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    translate: vi.fn(),
    transform: vi.fn(),
    beginPath: vi.fn(),
    closePath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    bezierCurveTo: vi.fn(),
    quadraticCurveTo: vi.fn(),
    arc: vi.fn(),
    arcTo: vi.fn(),
    ellipse: vi.fn(),
    rect: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    clip: vi.fn(),
    isPointInPath: vi.fn(),
    isPointInStroke: vi.fn(),
    measureText: vi.fn(() => ({ width: 0 })),
    canvas: document.createElement('canvas'),
  } as unknown as CanvasRenderingContext2D;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

// FileReader のモック
global.FileReader = class FileReader {
  readAsDataURL = vi.fn();
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  dispatchEvent = vi.fn();
  result: string | ArrayBuffer | null = null;
  error: DOMException | null = null;
  readyState = 0;
  onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null = null;
  onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null = null;
  onprogress: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null = null;
  onabort: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null = null;
  onloadstart: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null = null;
  onloadend: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null = null;
  abort = vi.fn();
  readAsText = vi.fn();
  readAsArrayBuffer = vi.fn();
  readAsBinaryString = vi.fn();
  EMPTY = 0;
  LOADING = 1;
  DONE = 2;
} as unknown as typeof FileReader;
