/**
 * レイヤーの種類
 */
export type LayerType = 'image' | 'text' | 'shape';

/**
 * 画像フィルターの種類
 */
export type FilterType =
  | 'brightness'
  | 'contrast'
  | 'saturation'
  | 'hue'
  | 'blur'
  | 'grayscale'
  | 'sepia';

/**
 * 画像フィルター
 */
export interface ImageFilter {
  type: FilterType;
  value: number; // フィルター強度
}

/**
 * レイヤーの変形情報
 */
export interface LayerTransform {
  x: number; // X座標
  y: number; // Y座標
  scaleX: number; // X方向のスケール
  scaleY: number; // Y方向のスケール
  rotation: number; // 回転角度（度）
}

/**
 * 画像データ
 */
export interface ImageData {
  src: string; // Data URL または Blob URL
  width: number;
  height: number;
}

/**
 * レイヤー
 */
export interface Layer {
  id: string; // 一意なID
  name: string; // レイヤー名
  type: LayerType; // レイヤータイプ
  visible: boolean; // 表示/非表示
  opacity: number; // 不透明度 (0-1)
  zIndex: number; // 重なり順序
  transform: LayerTransform; // 変形情報
  filters: ImageFilter[]; // 適用フィルター
  imageData?: ImageData; // 画像データ（画像レイヤーの場合）
}
