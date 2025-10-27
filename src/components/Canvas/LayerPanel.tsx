import { useLayerStore } from '../../stores/layerStore';
import './LayerPanel.css';

export function LayerPanel() {
  const { layers, activeLayerId, setActiveLayer, updateLayer, removeLayer } = useLayerStore();

  return (
    <div className="layer-panel">
      <h2>レイヤー</h2>
      <div className="layer-list">
        {layers.length === 0 && <p className="empty-message">レイヤーがありません</p>}
        {[...layers].reverse().map((layer) => (
          <div
            key={layer.id}
            className={`layer-item ${activeLayerId === layer.id ? 'active' : ''}`}
            onClick={() => setActiveLayer(layer.id)}
          >
            <div className="layer-preview">
              {layer.imageData && (
                <img src={layer.imageData.src} alt={layer.name} className="layer-thumbnail" />
              )}
            </div>
            <div className="layer-info">
              <div className="layer-name">{layer.name}</div>
              <div className="layer-controls">
                <button
                  className="icon-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateLayer(layer.id, { visible: !layer.visible });
                  }}
                  title={layer.visible ? '非表示' : '表示'}
                >
                  {layer.visible ? '👁️' : '🚫'}
                </button>
                <button
                  className="icon-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLayer(layer.id);
                  }}
                  title="削除"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="layer-opacity">
              <label>
                不透明度:
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={layer.opacity * 100}
                  onChange={(e) => {
                    e.stopPropagation();
                    updateLayer(layer.id, { opacity: Number(e.target.value) / 100 });
                  }}
                />
                <span>{Math.round(layer.opacity * 100)}%</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
