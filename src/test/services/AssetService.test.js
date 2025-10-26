import { AssetService } from '../../client/services/AssetService.js';

describe('AssetService', () => {
  let service;
  
  beforeEach(() => {
    service = new AssetService();
    fetch.mockClear();
  });

  describe('constructor', () => {
    it('should initialize with correct table name', () => {
      expect(service.tableName).toBe('x_1397622_asset_tr_asset');
    });
  });

  describe('list', () => {
    it('should fetch assets successfully', async () => {
      const mockAssets = [
        { sys_id: '1', name: 'Laptop', asset_tag: 'LAT001' },
        { sys_id: '2', name: 'Printer', asset_tag: 'PRT001' }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: mockAssets })
      });

      const result = await service.list();

      expect(fetch).toHaveBeenCalledWith(
        '/api/now/table/x_1397622_asset_tr_asset?sysparm_display_value=all&sysparm_limit=1000',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'X-UserToken': 'mock-user-token'
          }
        }
      );
      expect(result).toEqual(mockAssets);
    });

    it('should handle filters correctly', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [] })
      });

      await service.list({ status: 'available', category: 'hardware' });

      expect(fetch).toHaveBeenCalledWith(
        '/api/now/table/x_1397622_asset_tr_asset?status=available&category=hardware&sysparm_display_value=all&sysparm_limit=1000',
        expect.any(Object)
      );
    });

    it('should handle API errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({ error: { message: 'Invalid request' } })
      });

      await expect(service.list()).rejects.toThrow('Invalid request');
    });

    it('should handle network errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(service.list()).rejects.toThrow('Network error');
    });

    it('should return empty array when result is null', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: null })
      });

      const result = await service.list();
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create asset successfully', async () => {
      const assetData = { name: 'New Laptop', asset_tag: 'LAT002', category: 'hardware' };
      const mockResponse = { result: { sys_id: '123', ...assetData } };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await service.create(assetData);

      expect(fetch).toHaveBeenCalledWith(
        '/api/now/table/x_1397622_asset_tr_asset',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-UserToken': 'mock-user-token'
          },
          body: JSON.stringify(assetData)
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle creation errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({ error: { message: 'Missing required field' } })
      });

      await expect(service.create({})).rejects.toThrow('Missing required field');
    });
  });

  describe('update', () => {
    it('should update asset successfully', async () => {
      const sysId = '123';
      const updateData = { name: 'Updated Laptop' };
      const mockResponse = { result: { sys_id: sysId, ...updateData } };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await service.update(sysId, updateData);

      expect(fetch).toHaveBeenCalledWith(
        `/api/now/table/x_1397622_asset_tr_asset/${sysId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-UserToken': 'mock-user-token'
          },
          body: JSON.stringify(updateData)
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle update errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: { message: 'Record not found' } })
      });

      await expect(service.update('invalid-id', {})).rejects.toThrow('Record not found');
    });
  });

  describe('delete', () => {
    it('should delete asset successfully', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({})
      });

      const result = await service.delete('123');

      expect(fetch).toHaveBeenCalledWith(
        '/api/now/table/x_1397622_asset_tr_asset/123',
        {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'X-UserToken': 'mock-user-token'
          }
        }
      );
      expect(result).toBe(true);
    });

    it('should handle delete errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: { message: 'Record not found' } })
      });

      await expect(service.delete('invalid-id')).rejects.toThrow('Record not found');
    });
  });

  describe('get', () => {
    it('should get single asset successfully', async () => {
      const mockAsset = { sys_id: '123', name: 'Laptop', asset_tag: 'LAT001' };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: mockAsset })
      });

      const result = await service.get('123');

      expect(fetch).toHaveBeenCalledWith(
        '/api/now/table/x_1397622_asset_tr_asset/123?sysparm_display_value=all',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'X-UserToken': 'mock-user-token'
          }
        }
      );
      expect(result).toEqual(mockAsset);
    });

    it('should handle get errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: { message: 'Record not found' } })
      });

      await expect(service.get('invalid-id')).rejects.toThrow('Record not found');
    });
  });
});