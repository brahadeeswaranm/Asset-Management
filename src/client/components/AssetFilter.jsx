import React, { useState } from 'react';
import './AssetFilter.css';

export default function AssetFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all'
  });

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleReset = () => {
    const resetFilters = { search: '', status: 'all', category: 'all' };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="asset-filter">
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="search">Search Assets</label>
          <input
            type="text"
            id="search"
            placeholder="Search by name, tag, or description..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="in_use">In Use</option>
            <option value="maintenance">Maintenance</option>
            <option value="retired">Retired</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="furniture">Furniture</option>
            <option value="equipment">Equipment</option>
            <option value="vehicle">Vehicle</option>
          </select>
        </div>

        <div className="filter-actions">
          <button onClick={handleReset} className="reset-btn">
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}