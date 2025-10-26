import React, { useEffect, useState, useMemo } from 'react';
import { AssetService } from './services/AssetService.js';
import AssetForm from './components/AssetForm.jsx';
import AssetList from './components/AssetList.jsx';
import AssetFilter from './components/AssetFilter.jsx';
import './app.css';

export default function App() {
  const svc = useMemo(() => new AssetService(), []);
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  useEffect(() => { 
    loadAssets();
  }, [svc]);

  const loadAssets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await svc.list();
      setAssets(data);
      setFilteredAssets(data);
    } catch (err) {
      setError('Failed to load assets: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filters) => {
    let filtered = assets;
    
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(asset => {
        const status = typeof asset.status === 'object' ? asset.status.value : asset.status;
        return status === filters.status;
      });
    }
    
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(asset => {
        const category = typeof asset.category === 'object' ? asset.category.value : asset.category;
        return category === filters.category;
      });
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(asset => {
        const name = typeof asset.name === 'object' ? asset.name.display_value : asset.name;
        const assetTag = typeof asset.asset_tag === 'object' ? asset.asset_tag.display_value : asset.asset_tag;
        const description = typeof asset.description === 'object' ? asset.description.display_value : asset.description;
        
        return (name && name.toLowerCase().includes(searchLower)) ||
               (assetTag && assetTag.toLowerCase().includes(searchLower)) ||
               (description && description.toLowerCase().includes(searchLower));
      });
    }
    
    setFilteredAssets(filtered);
  };

  const handleAssetSaved = () => {
    setShowForm(false);
    setEditingAsset(null);
    loadAssets();
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setEditingAsset(null);
  };

  if (loading) {
    return (
      <div className="asset-app">
        <div className="loading">Loading assets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="asset-app">
        <div className="error">{error}</div>
        <button onClick={loadAssets} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="asset-app">
      <header className="app-header">
        <h1>Asset Tracking Manager</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="add-asset-btn"
          disabled={showForm}
        >
          Add New Asset
        </button>
      </header>

      {showForm && (
        <AssetForm 
          service={svc} 
          onSave={handleAssetSaved}
          onCancel={handleCancelEdit}
          editingAsset={editingAsset}
        />
      )}

      <AssetFilter onFilter={handleFilter} />
      
      <AssetList 
        assets={filteredAssets} 
        service={svc} 
        onEdit={handleEdit}
        onAssetUpdated={loadAssets}
      />
      
      <div className="asset-count">
        Showing {filteredAssets.length} of {assets.length} assets
      </div>
    </div>
  );
}