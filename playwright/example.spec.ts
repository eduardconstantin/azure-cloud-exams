import { test, expect } from "@playwright/test";

test("Example", async ({ page }) => {
  await page.goto("");
  expect(await page.getByRole("main").getByRole("link").all()).toHaveLength(22);
});
