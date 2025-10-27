# タスク一覧 (Task List)

## Phase 1: プロジェクトセットアップ

### TASK-001: プロジェクト初期化
- [ ] Vite + React + TypeScript のプロジェクト作成
- [ ] 必要な依存関係のインストール
  - fabric, zustand, dexie, ag-psd
  - @types/fabric
- [ ] ディレクトリ構造の作成
- [ ] `.gitignore` の設定
- [ ] 見積もり: 1h

### TASK-002: Linter / Formatter 設定
- [ ] ESLint の設定 (`.eslintrc.cjs`)
- [ ] Prettier の設定 (`.prettierrc`)
- [ ] TypeScript の設定 (`tsconfig.json`)
- [ ] `package.json` に Lint スクリプト追加
- [ ] 見積もり: 1h

### TASK-003: テスト環境構築
- [ ] Vitest の設定 (`vite.config.ts`)
- [ ] React Testing Library のセットアップ
- [ ] Playwright の設定 (`playwright.config.ts`)
- [ ] テスト用の fixtures ディレクトリ作成
- [ ] サンプル画像の準備
- [ ] 見積もり: 2h

### TASK-004: GitHub Actions 設定
- [ ] CI ワークフロー作成 (`.github/workflows/ci.yml`)
  - Lint, TypeCheck, Unit Test, E2E Test
  - カバレッジレポート
- [ ] Deploy ワークフロー作成 (`.github/workflows/deploy.yml`)
  - `main` ブランチへのマージ時
  - GitHub Pages デプロイ
- [ ] 見積もり: 2h

---

## Phase 2: 基本UI構築

### TASK-005: 型定義の作成
- [ ] `types/layer.ts` - Layer, LayerType
- [ ] `types/project.ts` - Project
- [ ] `types/canvas.ts` - Canvas設定
- [ ] `types/filter.ts` - ImageFilter
- [ ] 見積もり: 1h
- [ ] テスト: 型定義の整合性チェック

### TASK-006: 基本レイアウトの実装
- [ ] `App.tsx` - ルートコンポーネント
- [ ] 3カラムレイアウト（ツールバー / キャンバス / レイヤーパネル）
- [ ] レスポンシブ対応
- [ ] 見積もり: 2h
- [ ] テスト: スナップショットテスト、レスポンシブ表示の確認

### TASK-007: 共通コンポーネントの実装
- [ ] `components/common/Button.tsx`
- [ ] `components/common/Slider.tsx`
- [ ] `components/common/Input.tsx`
- [ ] 見積もり: 2h
- [ ] テスト: 各コンポーネントのユニットテスト（Props, イベント）

---

## Phase 3: Canvas 機能実装

### TASK-008: Canvas コンポーネント基礎
- [ ] `components/Canvas/Editor.tsx` - Fabric.js Canvas のマウント
- [ ] Canvas 初期化ロジック
- [ ] リサイズ対応
- [ ] 見積もり: 3h
- [ ] テスト: Canvas が正しく初期化されるか、リサイズ時の挙動

### TASK-009: Fabric.js ラッパー実装
- [ ] `lib/fabric/canvasManager.ts` - Canvas 操作の抽象化
- [ ] `lib/fabric/objectManager.ts` - オブジェクト（レイヤー）操作
- [ ] TypeScript 型定義の補完
- [ ] 見積もり: 3h
- [ ] テスト: 各メソッドのユニットテスト

---

## Phase 4: ファイルアップロード機能

### TASK-010: ファイルバリデーション
- [ ] `utils/file.ts` - MIME type チェック
- [ ] ファイルサイズチェック（10MB制限）
- [ ] 拡張子チェック（.png, .jpg, .jpeg）
- [ ] 見積もり: 1h
- [ ] テスト: 正常系・異常系のユニットテスト

### TASK-011: FileUploader コンポーネント
- [ ] `components/Upload/FileUploader.tsx`
- [ ] ファイル選択ボタン
- [ ] ドラッグ&ドロップエリア
- [ ] 複数ファイル対応
- [ ] エラーハンドリング
- [ ] 見積もり: 3h
- [ ] テスト: ファイル選択、D&D のシミュレーションテスト

### TASK-012: 画像読み込み処理
- [ ] `hooks/useImageUpload.ts`
- [ ] FileReader による読み込み
- [ ] Data URL への変換
- [ ] Fabric.Image への変換
- [ ] 見積もり: 2h
- [ ] テスト: 画像読み込みの非同期処理テスト

---

## Phase 5: レイヤー管理機能

### TASK-013: レイヤーストアの実装
- [ ] `stores/layerStore.ts` (Zustand)
- [ ] State: layers, activeLayerId
- [ ] Actions: addLayer, removeLayer, updateLayer, reorderLayers
- [ ] 見積もり: 2h
- [ ] テスト: 各アクションのユニットテスト、状態変化の確認

### TASK-014: LayerPanel コンポーネント
- [ ] `components/Canvas/LayerPanel.tsx`
- [ ] レイヤー一覧表示
- [ ] アクティブレイヤーのハイライト
- [ ] 見積もり: 2h
- [ ] テスト: レンダリングテスト、選択状態の確認

### TASK-015: レイヤー操作 UI
- [ ] 表示/非表示トグルボタン
- [ ] 削除ボタン
- [ ] 不透明度スライダー
- [ ] レイヤー名編集
- [ ] 見積もり: 3h
- [ ] テスト: 各操作のインタラクションテスト

### TASK-016: レイヤー順序変更（Drag & Drop）
- [ ] react-beautiful-dnd または @dnd-kit の導入
- [ ] ドラッグ可能なレイヤーアイテム
- [ ] ドロップ時の順序更新
- [ ] Canvas への反映
- [ ] 見積もり: 3h
- [ ] テスト: D&D のシミュレーションテスト

---

## Phase 6: 画像編集機能

### TASK-017: 画像処理ユーティリティ
- [ ] `lib/imageProcessor/colorAdjustment.ts`
  - 明度調整 (brightness)
  - 彩度調整 (saturation)
  - コントラスト調整 (contrast)
  - 色相調整 (hue)
- [ ] getImageData / putImageData によるピクセル操作
- [ ] 見積もり: 4h
- [ ] テスト: 各調整関数のユニットテスト（ピクセル値の検証）

### TASK-018: フィルター機能
- [ ] `lib/imageProcessor/filters.ts`
  - グレースケール
  - セピア
  - ぼかし（Gaussian Blur）
- [ ] 見積もり: 3h
- [ ] テスト: フィルター適用前後の画像比較

### TASK-019: Toolbar コンポーネント
- [ ] `components/Canvas/Toolbar.tsx`
- [ ] 色調整スライダー（明度、彩度、コントラスト、色相）
- [ ] フィルター選択ドロップダウン
- [ ] 回転ボタン（90度単位）
- [ ] 反転ボタン（水平・垂直）
- [ ] 見積もり: 4h
- [ ] テスト: スライダー操作、ボタンクリックのテスト

### TASK-020: Canvas への編集反映
- [ ] `hooks/useCanvas.ts`
- [ ] レイヤーへのフィルター適用
- [ ] Canvas の再描画
- [ ] パフォーマンス最適化（debounce, throttle）
- [ ] 見積もり: 3h
- [ ] テスト: 編集操作後の Canvas 状態確認

---

## Phase 7: 保存・エクスポート機能

### TASK-021: 画像エクスポート
- [ ] `lib/export/imageExporter.ts`
- [ ] Canvas → Blob 変換
- [ ] PNG / JPEG フォーマット選択
- [ ] ファイルダウンロード処理
- [ ] 見積もり: 2h
- [ ] テスト: エクスポート処理のユニットテスト

### TASK-022: プロジェクト保存（JSON）
- [ ] `lib/export/projectExporter.ts`
- [ ] Project オブジェクトの JSON シリアライゼーション
- [ ] レイヤー情報の保存（画像は Data URL）
- [ ] ファイルダウンロード
- [ ] 見積もり: 2h
- [ ] テスト: JSON の正確性、復元可能性

### TASK-023: IndexedDB 連携
- [ ] `lib/storage/projectStorage.ts` (Dexie.js)
- [ ] スキーマ定義
- [ ] CRUD 操作（Create, Read, Update, Delete）
- [ ] 見積もり: 3h
- [ ] テスト: IndexedDB の CRUD 操作テスト

### TASK-024: プロジェクト読み込み
- [ ] JSON ファイルのパース
- [ ] Project → Layers → Canvas への復元
- [ ] IndexedDB からの読み込み UI
- [ ] 見積もり: 3h
- [ ] テスト: 保存→読み込みの往復テスト

---

## Phase 8: エディタストアとUndo/Redo

### TASK-025: エディタストアの実装
- [ ] `stores/editorStore.ts` (Zustand)
- [ ] State: canvas, history, historyIndex
- [ ] Actions: setCanvas, undo, redo
- [ ] 見積もり: 2h
- [ ] テスト: Undo/Redo の状態変化テスト

### TASK-026: 履歴管理
- [ ] 操作履歴の記録（最大50件）
- [ ] Undo/Redo ボタンの実装
- [ ] キーボードショートカット（Ctrl+Z, Ctrl+Y）
- [ ] 見積もり: 3h
- [ ] テスト: 複数回の Undo/Redo テスト

---

## Phase 9: PSD ファイル対応（オプション）

### TASK-027: PSD パーサー実装
- [ ] `lib/psd/psdParser.ts` (ag-psd)
- [ ] PSD ファイルの読み込み
- [ ] レイヤー情報の抽出
- [ ] 画像データの変換
- [ ] 見積もり: 4h
- [ ] テスト: サンプル PSD ファイルのパーステスト

### TASK-028: PSD レイヤーの Canvas 反映
- [ ] PSD レイヤー → Layer 型への変換
- [ ] Canvas への追加
- [ ] レイヤー順序・ブレンドモードの保持
- [ ] 見積もり: 3h
- [ ] テスト: PSD 読み込み→表示の E2E テスト

---

## Phase 10: パフォーマンス最適化

### TASK-029: Web Worker の導入
- [ ] `workers/imageProcessor.worker.ts`
- [ ] 重い画像処理を別スレッドで実行
- [ ] メインスレッドとの通信
- [ ] 見積もり: 4h
- [ ] テスト: Worker の動作テスト、パフォーマンス計測

### TASK-030: レンダリング最適化
- [ ] React.memo の適用
- [ ] useMemo / useCallback の最適化
- [ ] Canvas 再描画の throttle
- [ ] 見積もり: 2h
- [ ] テスト: リレンダリング回数の計測

---

## Phase 11: E2Eテスト

### TASK-031: E2Eテストシナリオ実装
- [ ] `tests/e2e/image-upload.spec.ts`
  - 画像アップロード→表示確認
- [ ] `tests/e2e/layer-management.spec.ts`
  - レイヤー追加・削除・順序変更
- [ ] `tests/e2e/editing.spec.ts`
  - 色調整・フィルター適用→スクリーンショット比較
- [ ] `tests/e2e/export.spec.ts`
  - 画像・プロジェクトのエクスポート
- [ ] 見積もり: 6h

### TASK-032: クロスブラウザテスト
- [ ] Playwright で Chrome, Firefox, Safari 実行
- [ ] CI でのテスト自動化
- [ ] 見積もり: 2h

---

## Phase 12: ドキュメント・仕上げ

### TASK-033: ユーザードキュメント作成
- [ ] README.md の充実
  - プロジェクト概要
  - 機能一覧
  - 開発手順
  - デプロイ手順
- [ ] 使い方ガイド（オプション）
- [ ] 見積もり: 2h

### TASK-034: コードレビュー対応
- [ ] Lint エラーの解消
- [ ] テストカバレッジ確認（80%以上）
- [ ] 不要なコメント・console.log の削除
- [ ] 見積もり: 2h

### TASK-035: デプロイ確認
- [ ] GitHub Pages でのビルド確認
- [ ] 本番環境での動作テスト
- [ ] パフォーマンス計測
- [ ] 見積もり: 2h

---

## Phase 13: PR作成

### TASK-036: ブランチ作成とPR
- [ ] feature ブランチの作成（`feature/initial-implementation`）
- [ ] コミットの整理（必要に応じて squash）
- [ ] PR 作成（README.md のガイドラインに従う）
- [ ] レビュー依頼
- [ ] 見積もり: 1h

---

## 総見積もり時間

- **Phase 1**: 6h
- **Phase 2**: 5h
- **Phase 3**: 6h
- **Phase 4**: 6h
- **Phase 5**: 10h
- **Phase 6**: 14h
- **Phase 7**: 10h
- **Phase 8**: 5h
- **Phase 9**: 7h（オプション）
- **Phase 10**: 6h
- **Phase 11**: 8h
- **Phase 12**: 6h
- **Phase 13**: 1h

**合計: 約 83h（PSDオプション含む） / 約 76h（PSDオプション除く）**

---

## 依存関係マップ

```
TASK-001 (初期化)
  ↓
TASK-002 (Linter)
  ↓
TASK-003 (テスト環境)
  ↓
TASK-004 (CI/CD)
  ↓
TASK-005 (型定義) → TASK-013 (レイヤーストア)
  ↓                    ↓
TASK-006 (レイアウト)  TASK-014 (LayerPanel)
  ↓                    ↓
TASK-007 (共通コンポ)  TASK-015 (レイヤー操作UI)
  ↓                    ↓
TASK-008 (Canvas基礎)  TASK-016 (D&D)
  ↓
TASK-009 (Fabric.jsラッパー)
  ↓
TASK-010 (ファイルバリデーション)
  ↓
TASK-011 (FileUploader)
  ↓
TASK-012 (画像読み込み)
  ↓
TASK-017 (画像処理) → TASK-019 (Toolbar)
  ↓                    ↓
TASK-018 (フィルター)  TASK-020 (Canvas反映)
  ↓
TASK-021 (画像エクスポート)
  ↓
TASK-022 (JSON保存)
  ↓
TASK-023 (IndexedDB)
  ↓
TASK-024 (プロジェクト読み込み)
  ↓
TASK-025 (エディタストア)
  ↓
TASK-026 (Undo/Redo)
  ↓
[TASK-027, TASK-028] (PSDオプション)
  ↓
TASK-029 (Web Worker)
  ↓
TASK-030 (最適化)
  ↓
TASK-031 (E2Eテスト)
  ↓
TASK-032 (クロスブラウザ)
  ↓
TASK-033 (ドキュメント)
  ↓
TASK-034 (レビュー対応)
  ↓
TASK-035 (デプロイ確認)
  ↓
TASK-036 (PR作成)
```

---

## 優先度

### P0 (最優先 - MVP に必須)
- TASK-001 ~ TASK-004: セットアップ
- TASK-005 ~ TASK-009: 基本 UI と Canvas
- TASK-010 ~ TASK-012: ファイルアップロード
- TASK-013 ~ TASK-016: レイヤー管理
- TASK-017, TASK-019, TASK-020: 基本的な編集機能
- TASK-021: 画像エクスポート

### P1 (重要)
- TASK-018: フィルター機能
- TASK-022 ~ TASK-024: プロジェクト保存・読み込み
- TASK-025 ~ TASK-026: Undo/Redo
- TASK-031: E2Eテスト

### P2 (オプション)
- TASK-027 ~ TASK-028: PSD 対応
- TASK-029 ~ TASK-030: パフォーマンス最適化
- TASK-032: クロスブラウザテスト

---

## リスクが高いタスク

- **TASK-009**: Fabric.js と TypeScript の型統合（型定義が不完全）
- **TASK-016**: Drag & Drop の実装（ライブラリ選定次第で工数増）
- **TASK-017**: 画像処理の正確性（ピクセル操作のバグが混入しやすい）
- **TASK-027**: PSD パース（ag-psd の制限・バグの可能性）
- **TASK-029**: Web Worker（デバッグが難しい）
- **TASK-031**: E2Eテスト（Canvas のスクリーンショット比較の精度調整）
