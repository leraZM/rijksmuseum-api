import { test, expect } from '@playwright/test';
import { CollectionImageSchema } from '../../schemas/collectionImageSchema';
import { API_KEY } from '../../config/constants';
import { validateResponse } from '../../support/validationSchema';
import { apiClient } from '../../support/apiClient';

const OBJECT_NUMBER = 'SK-A-1105';

test.describe('Rijksmuseum Collection Image API Tests', () => {
  test('Fetch Collection Image Tiles - Valid Object', async () => {
    const response = await apiClient.get(`/collection/${OBJECT_NUMBER}/tiles`, {
      params: { key: API_KEY },
    });
    expect(response.status).toBe(200);
    const responseData = response.data;
    const data = validateResponse(CollectionImageSchema, responseData);
    expect(data.levels.length).toBeGreaterThan(0);
    for (const level of data.levels) {
      expect(level.width).toBeGreaterThan(0);
      expect(level.height).toBeGreaterThan(0);
      expect(level.tiles.length).toBeGreaterThan(0);
    }
  });
});
