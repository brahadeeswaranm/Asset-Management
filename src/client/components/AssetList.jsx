import React, { useState } from 'react';
import AssetItem from './AssetItem.jsx';
import './AssetList.css';

export default function AssetList({ assets, service, onEdit, onAssetUpdated }) {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAssets = [...assets].sort((a, b) => {
    let aValue = typeof a[sortField] === 'object' ? a[sortField].display_value : a[sortField];
    let bValue = typeof b[sortField] === 'object' ? b[sortField].display_value : b[sortField];
    
    if (!aValue) aValue = '';
    if (!bValue) bValue = '';
    
    const comparison = aValue.toString().localeCompare(bValue.toString());
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (assets.length === 0) {
    return (
      <div className="asset-list-container">
        <div className="empty-state">
          <h3>No assets found</h3>
          <p>Start by adding your first asset to track.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="asset-list-container">
      <div className="asset-list">
        <div className="asset-list-header">
          <div className="header-cell sortable" onClick={() => handleSort('name')}>
            Asset Name {getSortIcon('name')}
          </div>
          <div className="header-cell sortable" onClick={() => handleSort('asset_tag')}>
            Asset Tag {getSortIcon('asset_tag')}
          </div>
          <div className="header-cell sortable" onClick={() => handleSort('category')}>
            Category {getSortIcon('category')}
          </div>
          <div className="header-cell sortable" onClick={() => handleSort('status')}>
            Status {getSortIcon('status')}
          </div>
          <div className="header-cell sortable" onClick={() => handleSort('location')}>
            Location {getSortIcon('location')}
          </div>
          <div className="header-cell">Actions</div>
        </div>
        
        {sortedAssets.map(asset => (
          <AssetItem 
            key={typeof asset.sys_id === 'object' ? asset.sys_id.value : asset.sys_id}
            asset={asset} 
            service={service} 
            onEdit={onEdit}
            onAssetUpdated={onAssetUpdated}
          />
        ))}
      </div>
    </div>
  );
}