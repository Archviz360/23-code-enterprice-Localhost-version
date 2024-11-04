import React, { useRef } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

export function AssetPanel() {
  const { isAssetPanelOpen, assets, addAsset, removeAsset, toggleAssetPanel } = useEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAssetPanelOpen) return null;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const asset = {
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file)
      };
      addAsset(asset);
    }
    e.target.value = '';
  };

  return (
    <div className="fixed right-0 top-0 h-full w-64 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Asset Manager</h3>
        <button
          onClick={toggleAssetPanel}
          className="text-gray-400 hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <Upload className="w-4 h-4" />
        Upload Asset
      </button>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        accept="image/*,video/*,audio/*"
      />

      <div className="space-y-2">
        {assets.map((asset) => (
          <div
            key={asset.name}
            className="flex items-center justify-between p-2 bg-gray-700 rounded"
          >
            <div className="flex items-center gap-2">
              {asset.type.startsWith('image/') && (
                <img src={asset.url} alt={asset.name} className="w-8 h-8 object-cover rounded" />
              )}
              <span className="text-sm text-gray-300 truncate">{asset.name}</span>
            </div>
            <button
              onClick={() => removeAsset(asset.name)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}