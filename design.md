# 設計書 (Design Document)

## 技術スタック選定

### フレームワーク・ビルドツール

#### 選定: **Vite + React + TypeScript**

**採用理由:**
- **Vite**: 高速な開発サーバーとビルド、GitHub Pages へのデプロイが容易
- **React**: コンポーネント指向で UI の状態管理がしやすく、テスト環境が充実
- **TypeScript**: 型安全性によりバグを事前に防止、大規模化に強い

**代替案と不採用理由:**
1. **Next.js**: SSR/SSG 機能は不要、Vite より複雑
2. **Vanilla JS**: 大規模になると保守性が低下、テストが書きにくい
3. **Vue.js**: React の方がエコシステムとテストツールが豊富

---

### 画像編集・Canvas ライブラリ

#### 選定: **Fabric.js**

**採用理由:**
- Canvas ベースで高パフォーマンス
- オブジェクト（レイヤー）の管理、移動、変形が容易
- イベントハンドリングが充実（ドラッグ、リサイズなど）
- TypeScript 型定義が利用可能

**代替案と不採用理由:**
1. **Konva.js**: React 統合が若干煩雑、Fabric.js の方がドキュメントが豊富
2. **Canvas API 直接操作**: 低レベルすぎて実装コストが高い、テストが困難

---

### 画像処理（フィルター・色調整）

#### 選定: **Canvas API + カスタム実装 + glfx.js（オプション）**

**採用理由:**
- Canvas の `getImageData()` / `putImageData()` でピクセル操作が可能
- 基本的な色調整は自前実装でコントロール可能
- 高度なフィルターは glfx.js で WebGL 加速

**代替案と不採用理由:**
1. **CamanJS**: メンテナンスが停止している
2. **Seriously.js**: 学習コストが高い、オーバースペック

---

### PSD ファイル処理（オプション機能）

#### 選定: **ag-psd**

**採用理由:**
- PSD の読み書きができる唯一の実用的なライブラリ
- レイヤー情報を抽出可能
- TypeScript 対応

---

### 状態管理

#### 選定: **Zustand**

**採用理由:**
- シンプルで学習コストが低い
- React との統合が容易
- Redux より軽量で TypeScript との親和性が高い
- テストがしやすい（純粋関数ベース）

**代替案と不採用理由:**
1. **Redux Toolkit**: オーバースペック、ボイラープレートが多い
2. **Context API のみ**: パフォーマンス問題、複雑な状態管理に不向き

---

### データ永続化

#### 選定: **IndexedDB (Dexie.js)**

**採用理由:**
- 大容量データ（画像バイナリ）の保存が可能
- Dexie.js で API がシンプルに
- オフライン対応が可能

**代替案と不採用理由:**
1. **LocalStorage**: 容量制限（5MB）が小さすぎる
2. **SessionStorage**: ページを閉じると消える

---

### テスト環境

#### ユニットテスト: **Vitest + React Testing Library**

**採用理由:**
- Vitest は Vite ネイティブで高速、設定が少ない
- React Testing Library はユーザー視点のテストが書きやすい
- Jest との互換性が高い

#### E2Eテスト: **Playwright**

**採用理由:**
- モダンで高速、クロスブラウザ対応
- ヘッドレスモード、スクリーンショット比較が容易
- GitHub Actions との統合が簡単

**代替案と不採用理由:**
1. **Cypress**: Playwright の方が高速でモダン
2. **Puppeteer**: Playwright の方が多機能

---

### Linter / Formatter

#### 選定: **ESLint + Prettier + TypeScript ESLint**

**採用理由:**
- 業界標準、設定が豊富
- TypeScript の型チェックと連携
- GitHub Actions で自動チェック可能

---

### CI/CD

#### 選定: **GitHub Actions**

**採用理由:**
- GitHub Pages と統合が容易
- 無料枠が十分
- ワークフロー設定が簡単

---

## アーキテクチャ設計

### ディレクトリ構成

```
image-editor/
├── .github/
│   └── workflows/
│       ├── ci.yml          # テスト・Lint実行
│       └── deploy.yml      # GitHub Pages デプロイ
├── docs/                   # ドキュメント
│   ├── requirement.md
│   ├── design.md
│   ├── task.md
│   └── review.md
├── public/                 # 静的アセット
│   └── favicon.ico
├── src/
│   ├── components/         # Reactコンポーネント
│   │   ├── Canvas/         # Canvas関連
│   │   │   ├── Editor.tsx
│   │   │   ├── Toolbar.tsx
│   │   │   └── LayerPanel.tsx
│   │   ├── Upload/         # アップロード関連
│   │   │   └── FileUploader.tsx
│   │   └── common/         # 共通コンポーネント
│   │       ├── Button.tsx
│   │       └── Slider.tsx
│   ├── hooks/              # カスタムフック
│   │   ├── useCanvas.ts
│   │   ├── useImageUpload.ts
│   │   └── useLayerManagement.ts
│   ├── stores/             # Zustand ストア
│   │   ├── editorStore.ts
│   │   └── layerStore.ts
│   ├── lib/                # ユーティリティ・ライブラリラッパー
│   │   ├── fabric/         # Fabric.js ラッパー
│   │   ├── imageProcessor/ # 画像処理ロジック
│   │   ├── storage/        # IndexedDB アクセス
│   │   └── psd/            # PSD処理（オプション）
│   ├── types/              # 型定義
│   │   ├── canvas.ts
│   │   ├── layer.ts
│   │   └── project.ts
│   ├── utils/              # ヘルパー関数
│   │   ├── file.ts
│   │   └── color.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/                  # テストコード
│   ├── unit/               # ユニットテスト
│   │   ├── components/
│   │   ├── hooks/
│   │   └── lib/
│   ├── e2e/                # E2Eテスト
│   │   ├── image-upload.spec.ts
│   │   ├── layer-management.spec.ts
│   │   └── export.spec.ts
│   └── fixtures/           # テスト用データ
│       └── sample-images/
├── .eslintrc.cjs
├── .prettierrc
├── tsconfig.json
├── vite.config.ts
├── playwright.config.ts
├── package.json
└── README.md
```

---

### データモデル

#### Layer（レイヤー）

```typescript
interface Layer {
  id: string;                    // 一意なID
  name: string;                  // レイヤー名
  type: 'image' | 'text' | 'shape'; // レイヤータイプ
  visible: boolean;              // 表示/非表示
  opacity: number;               // 不透明度 (0-1)
  zIndex: number;                // 重なり順序
  transform: {                   // 変形情報
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
  };
  filters: ImageFilter[];        // 適用フィルター
  imageData?: {                  // 画像データ（画像レイヤーの場合）
    src: string;                 // Data URL または Blob URL
    width: number;
    height: number;
  };
}
```

#### Project（プロジェクト）

```typescript
interface Project {
  id: string;                    // プロジェクトID
  name: string;                  // プロジェクト名
  createdAt: Date;
  updatedAt: Date;
  canvas: {                      // Canvas設定
    width: number;
    height: number;
    backgroundColor: string;
  };
  layers: Layer[];               // レイヤー配列
}
```

#### ImageFilter（画像フィルター）

```typescript
interface ImageFilter {
  type: 'brightness' | 'contrast' | 'saturation' | 'hue' | 'blur' | 'grayscale' | 'sepia';
  value: number;                 // フィルター強度
}
```

---

### コンポーネント設計

#### 1. App (ルートコンポーネント)
- 全体レイアウトの管理
- ストアの初期化

#### 2. FileUploader
- ファイル選択・ドラッグ&ドロップ
- 画像バリデーション
- レイヤーへの変換

#### 3. Editor (Canvas 編集エリア)
- Fabric.js Canvas のマウント
- レイヤーのレンダリング
- ユーザー操作のハンドリング（ドラッグ、リサイズなど）

#### 4. Toolbar (編集ツールバー)
- 色調整スライダー
- 回転・反転ボタン
- フィルター選択
- エクスポートボタン

#### 5. LayerPanel (レイヤーパネル)
- レイヤー一覧表示
- 順序変更（ドラッグ&ドロップ）
- 表示/非表示切り替え
- 不透明度スライダー

---

### 状態管理設計

#### editorStore (Zustand)

```typescript
interface EditorStore {
  // State
  canvas: fabric.Canvas | null;
  activeLayerId: string | null;
  history: HistoryState[];
  historyIndex: number;

  // Actions
  setCanvas: (canvas: fabric.Canvas) => void;
  setActiveLayer: (layerId: string) => void;
  undo: () => void;
  redo: () => void;
}
```

#### layerStore (Zustand)

```typescript
interface LayerStore {
  // State
  layers: Layer[];

  // Actions
  addLayer: (layer: Layer) => void;
  removeLayer: (layerId: string) => void;
  updateLayer: (layerId: string, updates: Partial<Layer>) => void;
  reorderLayers: (fromIndex: number, toIndex: number) => void;
  applyFilter: (layerId: string, filter: ImageFilter) => void;
}
```

---

### 画像処理フロー

#### 1. アップロード
```
File選択 → Validation → FileReader → Data URL → Fabric.Image → Layer追加 → Canvas再描画
```

#### 2. 色調整
```
Layer選択 → スライダー操作 → getImageData → ピクセル操作 → putImageData → Canvas更新
```

#### 3. エクスポート
```
Canvas → toDataURL/toBlob → Download or IndexedDB保存
```

---

## パフォーマンス最適化

### 1. 画像処理の最適化
- **Web Worker**: 重い画像処理を別スレッドで実行
- **RequestAnimationFrame**: Canvas 再描画のスロットリング
- **キャッシング**: 処理済み画像を一時保存

### 2. レンダリング最適化
- **React.memo**: 不要な再レンダリング防止
- **useMemo / useCallback**: 計算結果・関数のメモ化
- **仮想化**: レイヤーが多い場合のリスト仮想化

### 3. バンドルサイズ最適化
- **Code Splitting**: React.lazy によるルート分割
- **Tree Shaking**: 未使用コードの削除
- **動的インポート**: PSD処理など大きなライブラリは必要時のみロード

---

## テスト戦略

### ユニットテスト対象

1. **画像処理関数** (`lib/imageProcessor/`)
   - 明度・彩度・コントラスト調整の正確性
   - エッジケース（範囲外の値、null/undefined）

2. **ストアロジック** (`stores/`)
   - レイヤーの追加・削除・更新
   - Undo/Redo の動作

3. **ユーティリティ関数** (`utils/`)
   - ファイルバリデーション
   - 色変換関数

4. **カスタムフック** (`hooks/`)
   - `useCanvas`, `useLayerManagement` の状態変化

### E2Eテスト対象

1. **画像アップロード〜編集〜エクスポート** の一連のフロー
2. **レイヤー操作** (追加・削除・順序変更・表示切替)
3. **色調整・フィルター適用** の結果確認（スクリーンショット比較）
4. **プロジェクト保存・読み込み**

### テストカバレッジ目標

- **全体**: 80% 以上
- **ビジネスロジック**: 90% 以上
- **UI コンポーネント**: 70% 以上

---

## セキュリティ考慮事項

### XSS 対策
- ユーザー入力（レイヤー名など）のサニタイゼーション
- `dangerouslySetInnerHTML` の使用禁止

### ファイルアップロード
- MIME タイプのバリデーション
- ファイルサイズ制限（10MB 以下）
- 悪意のあるファイル（実行可能ファイルなど）の拒否

### データ保護
- すべての処理をクライアント側で完結（サーバー送信なし）
- IndexedDB のデータは同一オリジン内でのみアクセス可能

---

## デプロイ設計

### GitHub Actions ワークフロー

#### CI (ci.yml)
- PR 作成時・プッシュ時に実行
- Lint、型チェック、ユニットテスト、E2Eテスト
- カバレッジレポート生成

#### Deploy (deploy.yml)
- `main` ブランチへのマージ時に実行
- ビルド (`vite build`)
- GitHub Pages へデプロイ
- `gh-pages` ブランチへのプッシュ

### 環境変数
- `VITE_APP_VERSION`: アプリバージョン
- `VITE_BASE_URL`: GitHub Pages のベースURL

---

## 今後の拡張性

### Phase 2 候補機能
- マスク・切り抜き機能
- ブラシツール（手書き描画）
- グラデーション適用
- レイヤースタイル（影、光彩など）

### Phase 3 候補機能
- AI フィルター（スタイル変換など）
- 複数ページ管理（アートボード）
- プラグインシステム

---

## リスクと緩和策

### リスク 1: ブラウザ互換性の問題
- **緩和策**: Can I Use で事前確認、Polyfill の導入、E2Eテストで複数ブラウザ検証

### リスク 2: 大きな画像でのパフォーマンス劣化
- **緩和策**: ファイルサイズ制限、Web Worker による非同期処理、プログレスバー表示

### リスク 3: IndexedDB のクォータ超過
- **緩和策**: ストレージ使用量の監視、古いプロジェクトの自動削除、警告表示

---

## 技術的課題

- **Canvas と React の統合**: 命令的 API と宣言的 UI の調整
- **Fabric.js の型定義**: 一部型定義が不完全なため、カスタム型定義が必要
- **E2Eテストでの Canvas 検証**: スクリーンショット比較の差分許容値調整
