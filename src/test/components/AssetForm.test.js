import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AssetForm from '../../client/components/AssetForm.jsx';

// Mock CSS import
jest.mock('../../client/components/AssetForm.css', () => ({}));

describe('AssetForm', () => {
  const mockService = {
    create: jest.fn(),
    update: jest.fn()
  };
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  const mockEditingAsset = {
    sys_id: { value: 'asset-123' },
    asset_tag: { display_value: 'LAT001' },
    name: { display_value: 'Test Laptop' },
    description: { display_value: 'Dell laptop for testing' },
    category: { value: 'hardware' },
    status: { value: 'available' },
    location: { display_value: 'Office A' },
    serial_number: { display_value: 'SN123456' },
    model: { display_value: 'Dell XPS 15' },
    manufacturer: { display_value: 'Dell' },
    purchase_date: { display_value: '2023-01-15' },
    purchase_price: { display_value: '1500.00' },
    warranty_expiry: { display_value: '2025-01-15' },
    is_critical: 'true',
    notes: { display_value: 'Test notes' }
  };

  beforeEach(() => {
    mockService.create.mockClear();
    mockService.update.mockClear();
    mockOnSave.mockClear();
    mockOnCancel.mockClear();
  });

  it('should render form for creating new asset', () => {
    render(
      <AssetForm 
        service={mockService} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );

    expect(screen.getByText('Add New Asset')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create asset/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/asset tag/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/asset name/i)).toBeInTheDocument();
  });

  it('should render form for editing existing asset', () => {
    render(
      <AssetForm 
        service={mockService} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
        editingAsset={mockEditingAsset}
      />
    );

    expect(screen.getByText('Edit Asset')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update asset/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('LAT001')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Laptop')).toBeInTheDocument();
  });

  it('should populate form fields when editing', () => {
    render(
      <AssetForm 
        service={mockService} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
        editingAsset={mockEditingAsset}
      />
    );

    expect(screen.getByDisplayValue('LAT001')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Laptop')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Dell laptop for testing')).toBeInTheDocument();
    expect(screen.getByDisplayValue('hardware')).toBeInTheDocument();
    expect(screen.getByDisplayValue('available')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Office A')).toBeInTheDocument();
    expect(screen.getByDisplayValue('SN123456')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Dell XPS 15')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Dell')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2023-01-15')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1500.00')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2025-01-15')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test notes')).toBeInTheDocument();
    
    const criticalCheckbox = screen.getByRole('checkbox', { name: /critical asset/i });
    expect(criticalCheckbox).toBeChecked();
  });

  it('should handle form input changes', async () => {
    const user = userEvent.setup();
    render(
      <AssetForm 
        service={mockService} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );

    const assetTagInput = screen.getByLabelText(/asset tag/i);
    const nameInput = screen.getByLabelText(/asset name/i);
    const categorySelect = screen.getByLabelText(/category/i);
    const criticalCheckbox = screen.getByRole('checkbox', { name: /critical asset/i });

    await user.type(assetTagInput, 'TEST001');
    await user.type(nameInput, 'Test Asset');
    await user.selectOptions(categorySelect, 'hardware');
    await user.click(criticalCheckbox);

    expect(assetTagInput).toHaveValue('TEST001');
    expect(nameInput).toHaveValue('Test Asset');
    expect(categorySelect).toHaveValue('hardware');
    expect(criticalCheckbox).toBeChecked();
  });

  it('should create new asset on form submission', async () => {
    const user = userEvent.setup();
    mockService.create.mockResolvedValue({ result: { sys_id: 'new-id' } });

    render(
      <AssetForm 
        service={mockService} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );

    // Fill required fields
    await user.type(screen.getByLabelText(/asset tag/i), 'TEST001');
    await user.type(screen.getByLabelText(/asset name/i), 'Test Asset');

    // Submit form
    await user.click(screen.getByRole('button', { name: /create asset/i }));

    expect(mockService.create).toHaveBeenCalledWith({
      asset_tag: 'TEST001',
      name: 'Test Asset',
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
    expect(mockOnSave).toHaveBeenCalled();
  });

  it('should update existing asset on form submission', async () => {
    const user = userEvent.setup();
    mockService.update.mockResolvedValue({ result: { sys_id: 'asset-123' } });

    render(
      <AssetForm 
        service={mockService} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
        editingAsset={mockEditingAsset}
      />
    );

    // Modify a field
    const nameInput = screen.getByDisplayValue('Test Laptop');
    await user.clear(nameInput);
    await user.type(nameInput, 'Updated Laptop');

    // Submit form
    await user.click(screen.getByRole('button', { name: /update asset/i }));

    expect(mockService.update).toHaveBeenCalledWith('asset-123', expect.objectContaining({
      name: 'Updated Laptop'
    }));
    expect(mockOnSave).toHaveBeenCalled();
  });

  it('should call onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <AssetForm 
        service={mockService} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );

    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('should call onCancel when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <AssetForm 
        service={mockService} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );

    await user.click(screen.getByRole('button', { name: /×/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('should show error message when creation fails', async () => {
    const user = userEvent.setup();
    mockService.create.mockRejectedValue(new Error('Creation failed'));

    render(
      <AssetForm 
        service={mockService} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );

    // Fill required fields and submit
    await user.type(screen.getByLabelText(/asset tag/i), 'TEST001');
    await user.type(screen.getByLabelText(/asset name/i), 'Test Asset');
    await user.click(screen.getByRole('button', { name: /create asset/i }));

    expect(screen.getByText('Failed to save asset: Creation failed')).toBeInTheDocument();
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('should disable submit button while saving', async () => {
    const user = userEvent.setup();
    
    // Make create promise not resolve immediately
    let resolveCreate;
    const createPromise = new Promise((resolve) => {
      resolveCreate = resolve;
    });
    mockService.create.mockReturnValue(createPromise);

    render(
      <AssetForm 
        service={mockService} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );

    // Fill required fields
    await user.type(screen.getByLabelText(/asset tag/i), 'TEST001');
    await user.type(screen.getByLabelText(/asset name/i), 'Test Asset');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /create asset/i });
    await user.click(submitButton);

    // Button should be disabled and show saving state
    expect(submitButton).toBeDisabled();
    expect(screen.getByText('Saving...')).toBeInTheDocument();

    // Resolve the create
    resolveCreate({ result: { sys_id: 'new-id' } });
    await createPromise;
  });

  it('should validate required fields', async () => {
    const user = userEvent.setup();
    render(
      <AssetForm 
        service={mockService} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );

    // Try to submit without filling required fields
    await user.click(screen.getByRole('button', { name: /create asset/i }));

    // Form should not be submitted
    expect(mockService.create).not.toHaveBeenCalled();
  });

  it('should have all status options in select', () => {
    render(
      <AssetForm 
        service={mockService} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );

    const statusSelect = screen.getByLabelText(/status/i);
    const options = Array.from(statusSelect.options).map(option => option.value);

    expect(options).toEqual([
      'available',
      'in_use',
      'maintenance',
      'retired',
      'lost'
    ]);
  });

  it('should have all category options in select', () => {
    render(
      <AssetForm 
        service={mockService} 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    );

    const categorySelect = screen.getByLabelText(/category/i);
    const options = Array.from(categorySelect.options).map(option => option.value);

    expect(options).toEqual([
      '',
      'hardware',
      'software',
      'furniture',
      'equipment',
      'vehicle'
    ]);
  });
});