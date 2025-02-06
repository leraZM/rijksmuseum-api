import { test, expect } from '@playwright/test';
import { CollectionResponseSchema } from '../../schemas/collectionSchema';
import { API_KEY } from '../../config/constants';
import { validateResponse } from '../../support/validationSchema';
import { apiClient } from '../../support/apiClient';

test.describe('Rijksmuseum Collection API Tests - Success', () => {
  test('Fetch Collection with Default Parameters', async () => {
    const response = await apiClient.get('/collection', {
      params: { key: API_KEY },
    });
    expect(response.status).toBe(200);
    const responseData = response.data;
    const data = validateResponse(CollectionResponseSchema, responseData);
    expect(data.artObjects.length).toBeGreaterThan(0);
  });
});

test.describe('Rijksmuseum API - Negative Scenarios', () => {
  test('Missing API Key', async () => {
    const response = await apiClient.get('/collection', {
      params: {},
    });
    expect(response.status).toBe(401);
  });

  test('Invalid API Key', async () => {
    const response = await apiClient.get('/', {
      params: { key: 'invalid_key' },
    });
    expect(response.status).toBe(404);
  });

  test('Invalid Culture Parameter', async () => {
    const invalidCultureUrl = `/invalid-culture/collection`;
    const response = await apiClient.get(invalidCultureUrl, {
      params: { key: API_KEY },
    });
    expect(response.status).toBe(404);
  });
});
