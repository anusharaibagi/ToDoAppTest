import {test} from '@playwright/test'

test('mock fake API', async ({ page }) => {
  await page.route('**/fake-todos', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ id: 1, title: 'Mocked Todo', completed: false }])
    });
  });

  await page.goto('https://demo.playwright.dev/todomvc/#/');

  // Simulate calling the fake API manually
  const result = await page.evaluate(async () => {
    const res = await fetch('/fake-todos');
    return res.json();
  });

  console.log(result); // [{ id: 1, title: 'Mocked Todo', completed: false }]
});
