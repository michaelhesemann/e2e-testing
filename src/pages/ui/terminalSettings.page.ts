import { expect, Locator, Page } from '@playwright/test';
import { SettingsPage } from '.';

export class TerminalSettings {
  readonly page: Page;
  readonly saveButtonLink: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async fillSettings(fontSize: string): Promise<SettingsPage> {
    await this.page.getByLabel('Font-Size').click();
    await this.page.getByLabel('Font-Size').fill(fontSize);
    await this.page.getByRole('button', { name: 'Save' }).click();
    return await this.fillSettings(fontSize);
  }

  async saveSettings(): Promise<SettingsPage> {
    this.saveButtonLink.click();
    return await this.saveSettings();
  }
}
