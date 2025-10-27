import { useState } from 'react';
import './App.css';
import { FileUploader } from './components/Upload/FileUploader';
import { Editor } from './components/Canvas/Editor';
import { LayerPanel } from './components/Canvas/LayerPanel';
import { Toolbar } from './components/Canvas/Toolbar';

function App() {
  const [hasImages, setHasImages] = useState(false);

  const handleImagesUploaded = () => {
    setHasImages(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Image Editor</h1>
      </header>

      <div className="app-content">
        {!hasImages && (
          <div className="upload-section">
            <FileUploader onImagesUploaded={handleImagesUploaded} />
          </div>
        )}

        {hasImages && (
          <>
            <aside className="sidebar left">
              <Toolbar />
            </aside>

            <main className="editor-area">
              <Editor />
            </main>

            <aside className="sidebar right">
              <LayerPanel />
            </aside>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
