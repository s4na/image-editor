import { test, expect } from '@playwright/test';

test.describe('Image Editor', () => {
  test('ページが正しく読み込まれる', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Image Editor');
  });

  test('ファイルアップロードUIが表示される', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.file-uploader')).toBeVisible();
    await expect(page.locator('.drop-zone')).toBeVisible();
  });

  test('ファイル選択ボタンが機能する', async ({ page }) => {
    await page.goto('/');
    const fileInput = page.locator('#file-input');
    await expect(fileInput).toBeAttached();
  });
});
