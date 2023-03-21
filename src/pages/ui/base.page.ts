import { Locator, Page } from '@playwright/test';
import { HomePage, LoginPage, SettingsPage, UserPage } from '.';

export class BasePage {
  protected readonly page: Page;
  private readonly homeMenuLink: Locator;
  private readonly userMenuLink: Locator;
  protected readonly profileMenuLink: Locator;
  private readonly aboutModalLink: Locator;
  private readonly logoutModalLink: Locator;
  private readonly closeButton: Locator;
  private readonly cancelButton: Locator;
  private readonly logoutButton: Locator;
  private readonly username: string;
  protected readonly headerTitle: string;
  protected readonly settingsModalLink: Locator;

  constructor(page: Page, headerTitle: string, username: string) {
    this.page = page;
    this.headerTitle = headerTitle;
    this.username = username;
    this.homeMenuLink = page.getByRole('link', { name: headerTitle });
    this.userMenuLink = page.getByRole('link', { name: 'Users' });
    this.profileMenuLink = page.getByRole('button', { name: username });
    this.aboutModalLink = page.getByRole('menuitem', { name: 'About' });
    this.settingsModalLink = page.getByRole('menuitem', { name: 'Settings' });
    this.closeButton = page.getByRole('button', { name: 'Close' }).locator('svg');
    this.logoutModalLink = page.getByRole('menuitem', { name: 'Logout' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async openHomePage(): Promise<HomePage> {
    await this.homeMenuLink.click();
    return new HomePage(this.page, this.headerTitle, this.username);
  }

  async openUserPage(): Promise<UserPage> {
    await this.userMenuLink.click();
    return new UserPage(this.page, this.headerTitle, this.username);
  }

  async displayAboutModal() {
    await this.profileMenuLink.click();
    await this.aboutModalLink.click();
    await this.closeButton.click();
  }

  async displaySettingsModal(): Promise<SettingsPage> {
    await this.profileMenuLink.click();
    await this.settingsModalLink.click();
    return new SettingsPage(this.page, this.headerTitle, this.username);
    }

  async displayLogoutModal() {
    await this.profileMenuLink.click();
    await this.logoutModalLink.click();
    await this.cancelButton.click();
  }

  async logout(): Promise<LoginPage> {
    await this.profileMenuLink.click();
    await this.logoutModalLink.click();
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
