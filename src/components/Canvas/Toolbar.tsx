import { useState } from 'react';
import { useEditorStore } from '../../stores/editorStore';
import './Toolbar.css';

export function Toolbar() {
  const canvas = useEditorStore((state) => state.canvas);
  const [brightness, setBrightness] = useState(0);

  const handleExport = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1,
    });

    const link = document.createElement('a');
    link.download = `image-editor-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
  };

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
    // TODO: 実際の明度調整処理を実装
    // ここではプレースホルダーとして値のみ保持
  };

  return (
    <div className="toolbar">
      <h2>ツール</h2>

      <div className="tool-section">
        <h3>色調整</h3>
        <div className="control-group">
          <label>
            明度
            <input
              type="range"
              min="-100"
              max="100"
              value={brightness}
              onChange={(e) => handleBrightnessChange(Number(e.target.value))}
            />
            <span>{brightness}</span>
          </label>
        </div>
      </div>

      <div className="tool-section">
        <h3>エクスポート</h3>
        <button className="export-button" onClick={handleExport} disabled={!canvas}>
          PNG として保存
        </button>
      </div>
    </div>
  );
}
