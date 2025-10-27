import { describe, it, expect, beforeEach } from 'vitest';
import { useLayerStore } from '../layerStore';
import type { Layer } from '../../types';

describe('layerStore', () => {
  beforeEach(() => {
    useLayerStore.setState({ layers: [], activeLayerId: null });
  });

  it('レイヤーを追加できる', () => {
    const layer: Layer = {
      id: 'layer-1',
      name: 'Test Layer',
      type: 'image',
      visible: true,
      opacity: 1,
      zIndex: 0,
      transform: { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0 },
      filters: [],
    };

    useLayerStore.getState().addLayer(layer);

    const state = useLayerStore.getState();
    expect(state.layers).toHaveLength(1);
    expect(state.layers[0]).toEqual(layer);
    expect(state.activeLayerId).toBe('layer-1');
  });

  it('レイヤーを削除できる', () => {
    const layer1: Layer = {
      id: 'layer-1',
      name: 'Layer 1',
      type: 'image',
      visible: true,
      opacity: 1,
      zIndex: 0,
      transform: { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0 },
      filters: [],
    };

    const layer2: Layer = {
      id: 'layer-2',
      name: 'Layer 2',
      type: 'image',
      visible: true,
      opacity: 1,
      zIndex: 1,
      transform: { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0 },
      filters: [],
    };

    useLayerStore.getState().addLayer(layer1);
    useLayerStore.getState().addLayer(layer2);
    useLayerStore.getState().removeLayer('layer-1');

    const state = useLayerStore.getState();
    expect(state.layers).toHaveLength(1);
    expect(state.layers[0].id).toBe('layer-2');
  });

  it('レイヤーを更新できる', () => {
    const layer: Layer = {
      id: 'layer-1',
      name: 'Test Layer',
      type: 'image',
      visible: true,
      opacity: 1,
      zIndex: 0,
      transform: { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0 },
      filters: [],
    };

    useLayerStore.getState().addLayer(layer);
    useLayerStore.getState().updateLayer('layer-1', { opacity: 0.5 });

    const state = useLayerStore.getState();
    expect(state.layers[0].opacity).toBe(0.5);
  });

  it('レイヤーの順序を変更できる', () => {
    const layer1: Layer = {
      id: 'layer-1',
      name: 'Layer 1',
      type: 'image',
      visible: true,
      opacity: 1,
      zIndex: 0,
      transform: { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0 },
      filters: [],
    };

    const layer2: Layer = {
      id: 'layer-2',
      name: 'Layer 2',
      type: 'image',
      visible: true,
      opacity: 1,
      zIndex: 1,
      transform: { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0 },
      filters: [],
    };

    useLayerStore.getState().addLayer(layer1);
    useLayerStore.getState().addLayer(layer2);
    useLayerStore.getState().reorderLayers(0, 1);

    const state = useLayerStore.getState();
    expect(state.layers[0].id).toBe('layer-2');
    expect(state.layers[1].id).toBe('layer-1');
  });
});
