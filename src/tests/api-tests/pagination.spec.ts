import { test, expect } from '@playwright/test';
import { API_KEY } from '../../config/constants';
import { apiClient } from '../../support/apiClient';

test.describe('Rijksmuseum API - Pagination Tests', () => {
  test('Fetch First Page', async () => {
    const response = await apiClient.get('/collection', {
      params: { key: API_KEY, p: 1, ps: 10 },
    });
    expect(response.status).toBe(200);
    const data = response.data;
    expect(data.artObjects.length).toBe(10);
  });

  test('Fetch Second Page', async () => {
    const response = await apiClient.get('/collection', {
      params: { key: API_KEY, p: 2, ps: 10 },
    });

    expect(response.status).toBe(200);
    const data = response.data;
    expect(data.artObjects.length).toBe(10);
  });

  test.fail(
    'Invalid Pagination - Page Number Exceeds Limit (Skipping due to Bug: API returns 200 instead of 404)',
    async () => {
      const response = await apiClient.get('/collection', {
        params: { key: API_KEY, p: 1001 },
      });
      expect(response.status).toBe(400);
    }
  );

  test.fail(
    'Invalid Page Size - Exceeds Limit (Skipping due to Bug: API returns 200 instead of 400)',
    async () => {
      const response = await apiClient.get('/collection', {
        params: { key: API_KEY, ps: 200 },
      });
      expect(response.status).toBe(400);
    }
  );
});
