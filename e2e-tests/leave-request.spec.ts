import { test, expect, type Page } from '@playwright/test';

test.describe('leave request page', () => {
  test('should load default route', async ({page}) => {
    await page.goto('http://localhost:4200');

    await expect(page).toHaveTitle('LeaveRequest');
  });
});