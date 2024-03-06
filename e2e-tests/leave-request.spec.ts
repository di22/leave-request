import { test, expect, type Page } from '@playwright/test';

test.describe('leave request page', () => {
  test('should load default route', async ({page}) => {
    await page.goto('http://localhost:4200');

    await expect(page).toHaveTitle('LeaveRequest');
  });

  test('should has the title', async ({page}) => {
    await page.goto('http://localhost:4200');

    const title = page.getByTestId('request-type-title');
    await expect(title.allInnerTexts).toBeTruthy();
  });

});