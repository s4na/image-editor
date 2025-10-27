import { create } from 'zustand';
import * as fabric from 'fabric';

interface EditorStore {
  // State
  canvas: fabric.Canvas | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCanvas: (canvas: fabric.Canvas | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  // Initial state
  canvas: null,
  isLoading: false,
  error: null,

  // Canvas を設定
  setCanvas: (canvas) =>
    set({
      canvas,
    }),

  // ローディング状態を設定
  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  // エラーを設定
  setError: (error) =>
    set({
      error,
    }),
}));
