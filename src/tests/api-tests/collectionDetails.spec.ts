import { test, expect } from '@playwright/test';
import { API_KEY } from '../../config/constants';
import { CollectionDetailsSchema } from '../../schemas/collectionDetailsSchema';
import { validateResponse } from '../../support/validationSchema';
import { apiClient } from '../../support/apiClient';

const OBJECT_NUMBER = 'SK-A-1105';

test.describe('Rijksmuseum Collection Details API Tests', () => {
  test('Fetch Collection Details - Valid Object', async () => {
    const response = await apiClient.get(`/collection/${OBJECT_NUMBER}`, {
      params: { key: API_KEY },
    });
    expect(response.status).toBe(200);
    const responseData = response.data;
    const data = validateResponse(CollectionDetailsSchema, responseData);
    expect(data.artObject.objectNumber).toBe(OBJECT_NUMBER);
    expect(data.artObject.hasImage).toBe(true);
  });

  test.fail('Fetch Collection Details - Invalid Object (Skipping due to Bug: API returns 200 instead of 404)', async () => {
    const INVALID_OBJECT_NUMBER = 'UNKNOWN-123';
    const response = await apiClient.get(`/collection/${INVALID_OBJECT_NUMBER}`, {
      params: { key: API_KEY },
    });
    expect(response.status).toBe(404);
  });
});
