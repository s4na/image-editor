import type { Layer } from './layer';

/**
 * Canvas設定
 */
export interface CanvasConfig {
  width: number; // Canvas幅
  height: number; // Canvas高さ
  backgroundColor: string; // 背景色
}

/**
 * プロジェクト
 */
export interface Project {
  id: string; // プロジェクトID
  name: string; // プロジェクト名
  createdAt: Date; // 作成日時
  updatedAt: Date; // 更新日時
  canvas: CanvasConfig; // Canvas設定
  layers: Layer[]; // レイヤー配列
}

/**
 * プロジェクトのJSON表現（シリアライゼーション用）
 */
export interface ProjectJSON {
  id: string;
  name: string;
  createdAt: string; // ISO 8601 形式
  updatedAt: string; // ISO 8601 形式
  canvas: CanvasConfig;
  layers: Layer[];
}
