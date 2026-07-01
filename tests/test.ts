import { expect, test } from '@playwright/test';

// TODO: this is leftover SvelteKit scaffold boilerplate and doesn't test this
// project's actual page. Replace with real coverage of the Tags component:
// adding/removing/clearing tags, the maximumTags/onlyUnique constraints, the
// oninput callback prop, and the remove button's per-tag aria-label.
test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible();
});
