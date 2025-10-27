import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { useEditorStore } from '../../stores/editorStore';
import { useLayerStore } from '../../stores/layerStore';
import './Editor.css';

export function Editor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvas, setCanvas } = useEditorStore();
  const layers = useLayerStore((state) => state.layers);

  // Canvas の初期化
  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
      setCanvas(null);
    };
  }, [setCanvas]);

  // レイヤーの描画
  useEffect(() => {
    if (!canvas) return;

    canvas.clear();

    // レイヤーを zIndex 順にソート
    const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);

    sortedLayers.forEach((layer) => {
      if (!layer.visible || !layer.imageData) return;

      fabric.Image.fromURL(layer.imageData.src).then((img) => {
        if (!img) return;

        img.set({
          left: layer.transform.x,
          top: layer.transform.y,
          scaleX: layer.transform.scaleX,
          scaleY: layer.transform.scaleY,
          angle: layer.transform.rotation,
          opacity: layer.opacity,
          selectable: true,
        });

        canvas.add(img);
        canvas.renderAll();
      });
    });
  }, [canvas, layers]);

  return (
    <div className="editor">
      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
