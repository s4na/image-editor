/**
 * ファイルサイズの上限（10MB）
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * サポートされる画像MIMEタイプ
 */
export const SUPPORTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

/**
 * ファイルが有効な画像かどうかを検証
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // MIMEタイプのチェック
  if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'サポートされていないファイル形式です。PNG または JPEG ファイルをアップロードしてください。',
    };
  }

  // ファイルサイズのチェック
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `ファイルサイズが大きすぎます。${MAX_FILE_SIZE / 1024 / 1024}MB 以下のファイルをアップロードしてください。`,
    };
  }

  return { valid: true };
}

/**
 * ファイルを Data URL に変換
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as data URL'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Data URL から Blob を作成
 */
export function dataURLToBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * ファイル名から拡張子を除いた名前を取得
 */
export function getFileNameWithoutExtension(filename: string): string {
  return filename.replace(/\.[^/.]+$/, '');
}
