import React, { useState, useEffect } from 'react';
import './AssetForm.css';

export default function AssetForm({ service, onSave, onCancel, editingAsset }) {
  const [formData, setFormData] = useState({
    asset_tag: '',
    name: '',
    description: '',
    category: '',
    status: 'available',
    assigned_to: '',
    location: '',
    serial_number: '',
    model: '',
    manufacturer: '',
    purchase_date: '',
    purchase_price: '',
    warranty_expiry: '',
    is_critical: false,
    notes: ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingAsset) {
      setFormData({
        asset_tag: typeof editingAsset.asset_tag === 'object' ? editingAsset.asset_tag.display_value : editingAsset.asset_tag || '',
        name: typeof editingAsset.name === 'object' ? editingAsset.name.display_value : editingAsset.name || '',
        description: typeof editingAsset.description === 'object' ? editingAsset.description.display_value : editingAsset.description || '',
        category: typeof editingAsset.category === 'object' ? editingAsset.category.value : editingAsset.category || '',
        status: typeof editingAsset.status === 'object' ? editingAsset.status.value : editingAsset.status || 'available',
        assigned_to: typeof editingAsset.assigned_to === 'object' ? editingAsset.assigned_to.value : editingAsset.assigned_to || '',
        location: typeof editingAsset.location === 'object' ? editingAsset.location.display_value : editingAsset.location || '',
        serial_number: typeof editingAsset.serial_number === 'object' ? editingAsset.serial_number.display_value : editingAsset.serial_number || '',
        model: typeof editingAsset.model === 'object' ? editingAsset.model.display_value : editingAsset.model || '',
        manufacturer: typeof editingAsset.manufacturer === 'object' ? editingAsset.manufacturer.display_value : editingAsset.manufacturer || '',
        purchase_date: typeof editingAsset.purchase_date === 'object' ? editingAsset.purchase_date.display_value : editingAsset.purchase_date || '',
        purchase_price: typeof editingAsset.purchase_price === 'object' ? editingAsset.purchase_price.display_value : editingAsset.purchase_price || '',
        warranty_expiry: typeof editingAsset.warranty_expiry === 'object' ? editingAsset.warranty_expiry.display_value : editingAsset.warranty_expiry || '',
        is_critical: String(editingAsset.is_critical) === 'true',
        notes: typeof editingAsset.notes === 'object' ? editingAsset.notes.display_value : editingAsset.notes || ''
      });
    }
  }, [editingAsset]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (editingAsset) {
        const sysId = typeof editingAsset.sys_id === 'object' ? editingAsset.sys_id.value : editingAsset.sys_id;
        await service.update(sysId, formData);
      } else {
        await service.create(formData);
      }
      onSave();
    } catch (err) {
      setError('Failed to save asset: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="asset-form-overlay">
      <form className="asset-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>{editingAsset ? 'Edit Asset' : 'Add New Asset'}</h2>
          <button type="button" onClick={onCancel} className="close-btn">×</button>
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="asset_tag">Asset Tag *</label>
            <input
              type="text"
              id="asset_tag"
              name="asset_tag"
              value={formData.asset_tag}
              onChange={handleChange}
              required
              maxLength="40"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Asset Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="furniture">Furniture</option>
              <option value="equipment">Equipment</option>
              <option value="vehicle">Vehicle</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="in_use">In Use</option>
              <option value="maintenance">Maintenance</option>
              <option value="retired">Retired</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="serial_number">Serial Number</label>
            <input
              type="text"
              id="serial_number"
              name="serial_number"
              value={formData.serial_number}
              onChange={handleChange}
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="purchase_date">Purchase Date</label>
            <input
              type="date"
              id="purchase_date"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="purchase_price">Purchase Price</label>
            <input
              type="number"
              id="purchase_price"
              name="purchase_price"
              value={formData.purchase_price}
              onChange={handleChange}
              step="0.01"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="warranty_expiry">Warranty Expiry</label>
            <input
              type="date"
              id="warranty_expiry"
              name="warranty_expiry"
              value={formData.warranty_expiry}
              onChange={handleChange}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="is_critical"
                checked={formData.is_critical}
                onChange={handleChange}
              />
              Critical Asset
            </label>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            maxLength="500"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            maxLength="1000"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="save-btn">
            {saving ? 'Saving...' : (editingAsset ? 'Update Asset' : 'Create Asset')}
          </button>
        </div>
      </form>
    </div>
  );
}