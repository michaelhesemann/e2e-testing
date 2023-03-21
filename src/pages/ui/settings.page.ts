import { Page } from '@playwright/test';
import { BasePage, TerminalSettings } from '.';

export class SettingsPage extends BasePage {
  constructor(page: Page, headerTitle: string, username: string) {
    super(page, username, headerTitle);
  }

  async fillAndSaveSettings(fontSize: string, username: string): Promise<SettingsPage> {
    let terminalSettings = new TerminalSettings(this.page);
    await terminalSettings.fillSettings(fontSize);
    await terminalSettings.saveSettings();
    return await this.fillAndSaveSettings(fontSize, username);
  }
}
