import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AssetItem from '../../client/components/AssetItem.jsx';

// Mock CSS import
jest.mock('../../client/components/AssetItem.css', () => ({}));

// Mock window.confirm
global.confirm = jest.fn();

describe('AssetItem', () => {
  const mockService = {
    delete: jest.fn()
  };
  const mockOnEdit = jest.fn();
  const mockOnAssetUpdated = jest.fn();

  const mockAsset = {
    sys_id: { value: 'asset-123' },
    name: { display_value: 'Test Laptop' },
    asset_tag: { display_value: 'LAT001' },
    category: { display_value: 'Hardware' },
    status: { display_value: 'Available' },
    location: { display_value: 'Office A' },
    description: { display_value: 'Dell Laptop for testing' },
    serial_number: { display_value: 'SN123456' },
    model: { display_value: 'Dell XPS 15' },
    manufacturer: { display_value: 'Dell' },
    assigned_to: { display_value: 'John Doe' },
    is_critical: 'false'
  };

  const mockAssetPrimitive = {
    sys_id: 'asset-456',
    name: 'Test Printer',
    asset_tag: 'PRT001',
    category: 'Hardware',
    status: 'In Use',
    location: 'Office B',
    description: 'HP Printer',
    serial_number: 'SN789012',
    model: 'HP LaserJet',
    manufacturer: 'HP',
    assigned_to: 'Jane Smith',
    is_critical: 'true'
  };

  beforeEach(() => {
    mockService.delete.mockClear();
    mockOnEdit.mockClear();
    mockOnAssetUpdated.mockClear();
    global.confirm.mockClear();
  });

  it('should render asset information correctly with object values', () => {
    render(
      <AssetItem 
        asset={mockAsset} 
        service={mockService} 
        onEdit={mockOnEdit} 
        onAssetUpdated={mockOnAssetUpdated} 
      />
    );

    expect(screen.getByText('Test Laptop')).toBeInTheDocument();
    expect(screen.getByText('LAT001')).toBeInTheDocument();
    expect(screen.getByText('Hardware')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Office A')).toBeInTheDocument();
  });

  it('should render asset information correctly with primitive values', () => {
    render(
      <AssetItem 
        asset={mockAssetPrimitive} 
        service={mockService} 
        onEdit={mockOnEdit} 
        onAssetUpdated={mockOnAssetUpdated} 
      />
    );

    expect(screen.getByText('Test Printer')).toBeInTheDocument();
    expect(screen.getByText('PRT001')).toBeInTheDocument();
    expect(screen.getByText('In Use')).toBeInTheDocument();
    expect(screen.getByText('Office B')).toBeInTheDocument();
  });

  it('should show critical badge for critical assets', () => {
    render(
      <AssetItem 
        asset={mockAssetPrimitive} 
        service={mockService} 
        onEdit={mockOnEdit} 
        onAssetUpdated={mockOnAssetUpdated} 
      />
    );

    expect(screen.getByText('CRITICAL')).toBeInTheDocument();
  });

  it('should not show critical badge for non-critical assets', () => {
    render(
      <AssetItem 
        asset={mockAsset} 
        service={mockService} 
        onEdit={mockOnEdit} 
        onAssetUpdated={mockOnAssetUpdated} 
      />
    );

    expect(screen.queryByText('CRITICAL')).not.toBeInTheDocument();
  });

  it('should handle missing values with dashes', () => {
    const assetWithMissingValues = {
      ...mockAsset,
      category: null,
      location: null,
      assigned_to: null
    };

    render(
      <AssetItem 
        asset={assetWithMissingValues} 
        service={mockService} 
        onEdit={mockOnEdit} 
        onAssetUpdated={mockOnAssetUpdated} 
      />
    );

    const dashes = screen.getAllByText('-');
    expect(dashes).toHaveLength(2); // category and location should show dashes
  });

  it('should call onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <AssetItem 
        asset={mockAsset} 
        service={mockService} 
        onEdit={mockOnEdit} 
        onAssetUpdated={mockOnAssetUpdated} 
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockAsset);
  });

  it('should expand and show details when row is clicked', async () => {
    const user = userEvent.setup();
    render(
      <AssetItem 
        asset={mockAsset} 
        service={mockService} 
        onEdit={mockOnEdit} 
        onAssetUpdated={mockOnAssetUpdated} 
      />
    );

    // Details should not be visible initially
    expect(screen.queryByText('Description:')).not.toBeInTheDocument();

    // Click on the row to expand
    const assetRow = screen.getByText('Test Laptop').closest('.asset-row');
    await user.click(assetRow);

    // Details should now be visible
    expect(screen.getByText('Description:')).toBeInTheDocument();
    expect(screen.getByText('Dell Laptop for testing')).toBeInTheDocument();
    expect(screen.getByText('Serial Number:')).toBeInTheDocument();
    expect(screen.getByText('SN123456')).toBeInTheDocument();
  });

  it('should handle delete confirmation and deletion', async () => {
    const user = userEvent.setup();
    global.confirm.mockReturnValue(true);
    mockService.delete.mockResolvedValue(true);

    render(
      <AssetItem 
        asset={mockAsset} 
        service={mockService} 
        onEdit={mockOnEdit} 
        onAssetUpdated={mockOnAssetUpdated} 
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(global.confirm).toHaveBeenCalledWith('Are you sure you want to delete asset "Test Laptop"?');
    expect(mockService.delete).toHaveBeenCalledWith('asset-123');
    expect(mockOnAssetUpdated).toHaveBeenCalled();
  });

  it('should not delete when confirmation is cancelled', async () => {
    const user = userEvent.setup();
    global.confirm.mockReturnValue(false);

    render(
      <AssetItem 
        asset={mockAsset} 
        service={mockService} 
        onEdit={mockOnEdit} 
        onAssetUpdated={mockOnAssetUpdated} 
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(global.confirm).toHaveBeenCalled();
    expect(mockService.delete).not.toHaveBeenCalled();
    expect(mockOnAssetUpdated).not.toHaveBeenCalled();
  });

  it('should handle delete error gracefully', async () => {
    const user = userEvent.setup();
    global.confirm.mockReturnValue(true);
    global.alert = jest.fn();
    mockService.delete.mockRejectedValue(new Error('Delete failed'));

    render(
      <AssetItem 
        asset={mockAsset} 
        service={mockService} 
        onEdit={mockOnEdit} 
        onAssetUpdated={mockOnAssetUpdated} 
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(global.alert).toHaveBeenCalledWith('Failed to delete asset: Delete failed');
    expect(mockOnAssetUpdated).not.toHaveBeenCalled();
  });

  it('should apply correct status CSS class', () => {
    render(
      <AssetItem 
        asset={mockAsset} 
        service={mockService} 
        onEdit={mockOnEdit} 
        onAssetUpdated={mockOnAssetUpdated} 
      />
    );

    const statusBadge = screen.getByText('Available');
    expect(statusBadge).toHaveClass('status-badge', 'status-available');
  });

  it('should disable delete button while deleting', async () => {
    const user = userEvent.setup();
    global.confirm.mockReturnValue(true);
    
    // Make delete promise not resolve immediately
    let resolveDelete;
    const deletePromise = new Promise((resolve) => {
      resolveDelete = resolve;
    });
    mockService.delete.mockReturnValue(deletePromise);

    render(
      <AssetItem 
        asset={mockAsset} 
        service={mockService} 
        onEdit={mockOnEdit} 
        onAssetUpdated={mockOnAssetUpdated} 
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    // Button should be disabled and show loading state
    expect(deleteButton).toBeDisabled();
    expect(screen.getByText('...')).toBeInTheDocument();

    // Resolve the delete
    resolveDelete();
    await deletePromise;
  });
});