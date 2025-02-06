import { test, expect } from '@playwright/test';
import { API_KEY } from '../../config/constants';
import { apiClient } from '../../support/apiClient';

test.describe('Performance Test - Collection Retrieval', () => {
  test.fail(
    'Retrieve a collection and measure response time (Skipping: Response time most of the times > 1000 ms)',
    async () => {
      const MAX_ACCEPTABLE_TIME = 1000;
      const startTime = Date.now();
      const response = await apiClient.get('/collection', {
        params: { key: API_KEY },
      });
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      console.log(`⏱️ Response Time: ${responseTime}ms`);
      expect(response.status).toBe(200);
      expect(responseTime).toBeLessThan(MAX_ACCEPTABLE_TIME);
    }
  );
});
