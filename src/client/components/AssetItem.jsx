import React, { useState } from 'react';
import './AssetItem.css';

export default function AssetItem({ asset, service, onEdit, onAssetUpdated }) {
  const [deleting, setDeleting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const sysId = typeof asset.sys_id === 'object' ? asset.sys_id.value : asset.sys_id;
  const name = typeof asset.name === 'object' ? asset.name.display_value : asset.name;
  const assetTag = typeof asset.asset_tag === 'object' ? asset.asset_tag.display_value : asset.asset_tag;
  const category = typeof asset.category === 'object' ? asset.category.display_value : asset.category;
  const status = typeof asset.status === 'object' ? asset.status.display_value : asset.status;
  const location = typeof asset.location === 'object' ? asset.location.display_value : asset.location;
  const description = typeof asset.description === 'object' ? asset.description.display_value : asset.description;
  const serialNumber = typeof asset.serial_number === 'object' ? asset.serial_number.display_value : asset.serial_number;
  const model = typeof asset.model === 'object' ? asset.model.display_value : asset.model;
  const manufacturer = typeof asset.manufacturer === 'object' ? asset.manufacturer.display_value : asset.manufacturer;
  const assignedTo = typeof asset.assigned_to === 'object' ? asset.assigned_to.display_value : asset.assigned_to;
  const isCritical = String(asset.is_critical) === 'true';

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete asset "${name}"?`)) {
      return;
    }

    setDeleting(true);
    try {
      await service.delete(sysId);
      onAssetUpdated();
    } catch (error) {
      alert('Failed to delete asset: ' + error.message);
    } finally {
      setDeleting(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'available': return 'status-available';
      case 'in use': return 'status-in-use';
      case 'maintenance': return 'status-maintenance';
      case 'retired': return 'status-retired';
      case 'lost': return 'status-lost';
      default: return 'status-default';
    }
  };

  return (
    <div className="asset-item">
      <div className="asset-row" onClick={() => setExpanded(!expanded)}>
        <div className="cell">
          <div className="asset-name">
            {name}
            {isCritical && <span className="critical-badge">CRITICAL</span>}
          </div>
        </div>
        <div className="cell">{assetTag}</div>
        <div className="cell">{category || '-'}</div>
        <div className="cell">
          <span className={`status-badge ${getStatusClass(status)}`}>
            {status || 'Unknown'}
          </span>
        </div>
        <div className="cell">{location || '-'}</div>
        <div className="cell actions">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(asset); }} 
            className="edit-btn"
            title="Edit Asset"
          >
            Edit
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleDelete(); }} 
            className="delete-btn"
            disabled={deleting}
            title="Delete Asset"
          >
            {deleting ? '...' : 'Delete'}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="asset-details">
          <div className="details-grid">
            {description && (
              <div className="detail-item full-width">
                <strong>Description:</strong> {description}
              </div>
            )}
            {serialNumber && (
              <div className="detail-item">
                <strong>Serial Number:</strong> {serialNumber}
              </div>
            )}
            {model && (
              <div className="detail-item">
                <strong>Model:</strong> {model}
              </div>
            )}
            {manufacturer && (
              <div className="detail-item">
                <strong>Manufacturer:</strong> {manufacturer}
              </div>
            )}
            {assignedTo && (
              <div className="detail-item">
                <strong>Assigned To:</strong> {assignedTo}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}