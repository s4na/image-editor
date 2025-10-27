import { describe, it, expect } from 'vitest';
import { validateImageFile, getFileNameWithoutExtension } from '../file';

describe('file utils', () => {
  describe('validateImageFile', () => {
    it('有効なPNG画像を受け入れる', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('有効なJPEG画像を受け入れる', () => {
      const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('サポートされていないファイル形式を拒否する', () => {
      const file = new File([''], 'test.gif', { type: 'image/gif' });
      const result = validateImageFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('サポートされていない');
    });

    it('ファイルサイズが大きすぎる場合を拒否する', () => {
      const largeData = new Uint8Array(11 * 1024 * 1024); // 11MB
      const file = new File([largeData], 'large.png', { type: 'image/png' });
      const result = validateImageFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('ファイルサイズが大きすぎます');
    });
  });

  describe('getFileNameWithoutExtension', () => {
    it('拡張子を除いたファイル名を返す', () => {
      expect(getFileNameWithoutExtension('test.png')).toBe('test');
      expect(getFileNameWithoutExtension('image.jpg')).toBe('image');
      expect(getFileNameWithoutExtension('file.with.dots.jpeg')).toBe('file.with.dots');
    });

    it('拡張子がない場合はそのまま返す', () => {
      expect(getFileNameWithoutExtension('noextension')).toBe('noextension');
    });
  });
});
