import { test, expect } from '@playwright/test';
import { API_KEY } from '../../config/constants';
import { CollectionResponseSchema } from '../../schemas/collectionSchema';
import { validateResponse } from '../../support/validationSchema';
import { apiClient } from '../../support/apiClient';

test.describe('Collection - Filtering Tests', () => {
  const filters = [
    { key: 'involvedMaker', value: 'Georgius Jacobus Johannes van Os' },
    { key: 'type', value: 'painting' },
    { key: 'material', value: 'canvas' },
    { key: 'technique', value: 'etching' },
    { key: 'f.dating.period', value: '17' },
  ];

  filters.forEach(({ key, value }) => {
    test(`Filter by ${key}: ${value}`, async () => {
      const response = await apiClient.get('/collection', {
        params: {
          key: API_KEY,
          [key]: value,
        },
      });
      expect(response.status).toBe(200);
      const responseData = response.data;
      validateResponse(CollectionResponseSchema, responseData);
    });
  });

  test.fail('Invalid Data Type for Filter - Period as String (Bug: API returns 200 instead of 400)', async () => {
    /* 
    Parameter f.dating.period
    Format: 0-21
    Note: The century in which the object is made. Can be negative as well (e.g. -1)
    */
    const response = await apiClient.get('/collection', {
      params: { key: API_KEY, 'f.dating.period': 'seventeen' },
    });
    expect(response.status).toBe(400);
  });

  test('Search for Non-Existent Artist', async () => {
    const response = await apiClient.get('/collection', {
      params: { key: API_KEY, involvedMaker: 'Unknown Artist 12345' },
    });
    expect(response.status).toBe(200);
    expect(response.data.count).toBe(0);
  });
});
