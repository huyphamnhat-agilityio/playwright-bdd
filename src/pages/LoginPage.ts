import { Page, Locator } from '@playwright/test';
import { BasePage } from '@/pages/BasePage';

export class LoginPage extends BasePage {
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailField = page.getByRole('textbox', { name: 'Email *' });
    this.passwordField = page.getByRole('textbox', { name: 'Password *' });
    this.loginButton = page.getByRole('button', { name: 'Login ' });
  }

  async navigateTo() {
    await this.page.goto('#/login');
  }

  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
