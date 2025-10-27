import { useCallback, useState } from 'react';
import { validateImageFile, fileToDataURL, getFileNameWithoutExtension } from '../../utils/file';
import { useLayerStore } from '../../stores/layerStore';
import type { Layer } from '../../types';
import './FileUploader.css';

interface FileUploaderProps {
  onImagesUploaded: () => void;
}

export function FileUploader({ onImagesUploaded }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addLayer = useLayerStore((state) => state.addLayer);

  const handleFiles = useCallback(
    async (files: FileList) => {
      setError(null);
      const fileArray = Array.from(files);
      let hasValidFile = false;

      for (const file of fileArray) {
        const validation = validateImageFile(file);
        if (!validation.valid) {
          setError(validation.error || 'Invalid file');
          continue;
        }

        try {
          const dataURL = await fileToDataURL(file);
          const img = new Image();

          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = dataURL;
          });

          const layer: Layer = {
            id: `layer-${Date.now()}-${Math.random()}`,
            name: getFileNameWithoutExtension(file.name),
            type: 'image',
            visible: true,
            opacity: 1,
            zIndex: 0,
            transform: {
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              rotation: 0,
            },
            filters: [],
            imageData: {
              src: dataURL,
              width: img.width,
              height: img.height,
            },
          };

          addLayer(layer);
          hasValidFile = true;
        } catch {
          setError(`Failed to load image: ${file.name}`);
        }
      }

      if (hasValidFile) {
        onImagesUploaded();
      }
    },
    [addLayer, onImagesUploaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );

  return (
    <div className="file-uploader">
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="drop-zone-content">
          <svg
            className="upload-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <h2>画像をドラッグ&ドロップ</h2>
          <p>または</p>
          <label htmlFor="file-input" className="file-input-label">
            ファイルを選択
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            multiple
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
          <p className="file-info">PNG, JPEG (最大 10MB)</p>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
