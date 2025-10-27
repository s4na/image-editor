import { create } from 'zustand';
import type { Layer } from '../types';

interface LayerStore {
  // State
  layers: Layer[];
  activeLayerId: string | null;

  // Actions
  addLayer: (layer: Layer) => void;
  removeLayer: (layerId: string) => void;
  updateLayer: (layerId: string, updates: Partial<Layer>) => void;
  reorderLayers: (fromIndex: number, toIndex: number) => void;
  setActiveLayer: (layerId: string | null) => void;
  clearLayers: () => void;
}

export const useLayerStore = create<LayerStore>((set) => ({
  // Initial state
  layers: [],
  activeLayerId: null,

  // レイヤーを追加
  addLayer: (layer) =>
    set((state) => ({
      layers: [...state.layers, layer],
      activeLayerId: layer.id,
    })),

  // レイヤーを削除
  removeLayer: (layerId) =>
    set((state) => {
      const newLayers = state.layers.filter((l) => l.id !== layerId);
      const newActiveId =
        state.activeLayerId === layerId
          ? newLayers.length > 0
            ? newLayers[newLayers.length - 1].id
            : null
          : state.activeLayerId;

      return {
        layers: newLayers,
        activeLayerId: newActiveId,
      };
    }),

  // レイヤーを更新
  updateLayer: (layerId, updates) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === layerId ? { ...layer, ...updates } : layer
      ),
    })),

  // レイヤーの順序を変更
  reorderLayers: (fromIndex, toIndex) =>
    set((state) => {
      const newLayers = [...state.layers];
      const [removed] = newLayers.splice(fromIndex, 1);
      newLayers.splice(toIndex, 0, removed);

      // zIndex を再計算
      return {
        layers: newLayers.map((layer, index) => ({
          ...layer,
          zIndex: index,
        })),
      };
    }),

  // アクティブレイヤーを設定
  setActiveLayer: (layerId) =>
    set({
      activeLayerId: layerId,
    }),

  // すべてのレイヤーをクリア
  clearLayers: () =>
    set({
      layers: [],
      activeLayerId: null,
    }),
}));
