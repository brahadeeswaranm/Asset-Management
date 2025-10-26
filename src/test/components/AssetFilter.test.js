import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AssetFilter from '../../client/components/AssetFilter.jsx';

// Mock CSS import
jest.mock('../../client/components/AssetFilter.css', () => ({}));

describe('AssetFilter', () => {
  const mockOnFilter = jest.fn();

  beforeEach(() => {
    mockOnFilter.mockClear();
  });

  it('should render all filter elements', () => {
    render(<AssetFilter onFilter={mockOnFilter} />);

    expect(screen.getByLabelText(/search assets/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset filters/i })).toBeInTheDocument();
  });

  it('should have correct default values', () => {
    render(<AssetFilter onFilter={mockOnFilter} />);

    expect(screen.getByDisplayValue('All Statuses')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Categories')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search by name, tag, or description/i)).toHaveValue('');
  });

  it('should call onFilter when search input changes', async () => {
    const user = userEvent.setup();
    render(<AssetFilter onFilter={mockOnFilter} />);

    const searchInput = screen.getByPlaceholderText(/search by name, tag, or description/i);
    await user.type(searchInput, 'laptop');

    expect(mockOnFilter).toHaveBeenLastCalledWith({
      search: 'laptop',
      status: 'all',
      category: 'all'
    });
  });

  it('should call onFilter when status changes', async () => {
    const user = userEvent.setup();
    render(<AssetFilter onFilter={mockOnFilter} />);

    const statusSelect = screen.getByLabelText(/status/i);
    await user.selectOptions(statusSelect, 'available');

    expect(mockOnFilter).toHaveBeenLastCalledWith({
      search: '',
      status: 'available',
      category: 'all'
    });
  });

  it('should call onFilter when category changes', async () => {
    const user = userEvent.setup();
    render(<AssetFilter onFilter={mockOnFilter} />);

    const categorySelect = screen.getByLabelText(/category/i);
    await user.selectOptions(categorySelect, 'hardware');

    expect(mockOnFilter).toHaveBeenLastCalledWith({
      search: '',
      status: 'all',
      category: 'hardware'
    });
  });

  it('should reset all filters when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<AssetFilter onFilter={mockOnFilter} />);

    // Set some filters first
    const searchInput = screen.getByPlaceholderText(/search by name, tag, or description/i);
    const statusSelect = screen.getByLabelText(/status/i);
    const categorySelect = screen.getByLabelText(/category/i);

    await user.type(searchInput, 'laptop');
    await user.selectOptions(statusSelect, 'in_use');
    await user.selectOptions(categorySelect, 'hardware');

    // Reset filters
    const resetButton = screen.getByRole('button', { name: /reset filters/i });
    await user.click(resetButton);

    expect(mockOnFilter).toHaveBeenLastCalledWith({
      search: '',
      status: 'all',
      category: 'all'
    });

    // Check that form fields are reset
    expect(searchInput).toHaveValue('');
    expect(statusSelect).toHaveValue('all');
    expect(categorySelect).toHaveValue('all');
  });

  it('should have all status options', () => {
    render(<AssetFilter onFilter={mockOnFilter} />);

    const statusSelect = screen.getByLabelText(/status/i);
    const options = Array.from(statusSelect.options).map(option => option.value);

    expect(options).toEqual([
      'all',
      'available',
      'in_use',
      'maintenance',
      'retired',
      'lost'
    ]);
  });

  it('should have all category options', () => {
    render(<AssetFilter onFilter={mockOnFilter} />);

    const categorySelect = screen.getByLabelText(/category/i);
    const options = Array.from(categorySelect.options).map(option => option.value);

    expect(options).toEqual([
      'all',
      'hardware',
      'software',
      'furniture',
      'equipment',
      'vehicle'
    ]);
  });

  it('should maintain filter state correctly', async () => {
    const user = userEvent.setup();
    render(<AssetFilter onFilter={mockOnFilter} />);

    const searchInput = screen.getByPlaceholderText(/search by name, tag, or description/i);
    const statusSelect = screen.getByLabelText(/status/i);

    // Change search
    await user.type(searchInput, 'test');
    expect(searchInput).toHaveValue('test');

    // Change status
    await user.selectOptions(statusSelect, 'maintenance');
    expect(statusSelect).toHaveValue('maintenance');

    // Search input should still have its value
    expect(searchInput).toHaveValue('test');
  });
});