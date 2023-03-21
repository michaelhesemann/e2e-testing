import { test } from '@playwright/test';
import { LoginPage as UILoginPage, SettingsPage } from '../src/pages/ui';

test('Change user settings', async ({ page }) => {
  let loginPage = new UILoginPage(page);
  await loginPage.goto(process.env.HOBBYFARM_UI_URL as string);
  let homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  let settingsPage = await homePage.displaySettingsModal();
  await settingsPage.fillAndSaveSettings('21' as string, process.env.HOBBYFARM_ADMIN_USR as string);
  loginPage = await homePage.logout();
})
