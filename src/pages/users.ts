import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';
import { Table } from '@/utils';
import { API_ENDPOINTS } from '@/constants';
import { User } from '@/types';

export class UsersPage extends BasePage {
  readonly newRecordButton: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly passwordConfirmField: Locator;
  readonly createButton: Locator;
  readonly saveChangesButton: Locator;
  readonly headerCheckbox: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly cancelButton: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly table: Table;

  constructor(page: Page) {
    super(page);
    this.newRecordButton = page
      .getByRole('button', { name: 'New Record' })
      .first();
    this.emailField = page.getByRole('textbox', { name: ' email *' });
    this.passwordField = page.getByRole('textbox', { name: ' Password *' });
    this.passwordConfirmField = page.getByRole('textbox', {
      name: ' Password confirm *',
    });
    this.createButton = page.getByRole('button', { name: 'Create' });
    this.saveChangesButton = page.getByRole('button', { name: 'Save changes' });
    this.headerCheckbox = page.locator(`label[for="checkbox_0"]`);
    this.deleteButton = page.getByRole('button', { name: 'Delete selected' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Yes' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.searchInput = page
      .getByRole('textbox')
      .filter({ hasText: 'Search term or filter like' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.table = new Table(page, 'table');
  }

  async navigateTo() {
    await this.page.goto('');
  }

  async createUser(email: string, password: string, passwordConfirm: string) {
    await this.newRecordButton.click();
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.passwordConfirmField.fill(passwordConfirm);
    await this.createButton.click();
  }

  async getUserByEmail(email: string): Promise<Locator> {
    return this.page.getByText(email);
  }

  async isUserVisible(email: string): Promise<boolean> {
    try {
      const user = await this.getUserByEmail(email);
      return await user.isVisible({ timeout: 2000 });
    } catch {
      return false;
    }
  }

  getUserDeleteCheckbox(id: string) {
    return this.page.locator(`label[for="checkbox_${id}"]`);
  }

  async editUserByEmail(email: string) {
    const userRow = await this.getUserByEmail(email);
    await userRow.click();
  }

  async updateUser(email: string, password: string, passwordConfirm: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.passwordConfirmField.fill(passwordConfirm);
    await this.saveChangesButton.click();
  }

  async verifySuccessMessage(message: string) {
    const successMessage = this.page.getByText(message);
    await successMessage.waitFor({ state: 'visible', timeout: 30000 });
    return successMessage;
  }

  async createUserViaUI(email: string, password: string) {
    await this.newRecordButton.click();
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.passwordConfirmField.fill(password);

    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes(API_ENDPOINTS.COLLECTIONS) &&
          response.request().method() === 'POST',
        { timeout: 30000 },
      ),
      this.createButton.click(),
    ]);

    await response.finished();

    return (await response.json()) as User;
  }

  async fillUserForm(email: string, password: string, passwordConfirm: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.passwordConfirmField.fill(passwordConfirm);
  }

  async clickChangePasswordCheckbox() {
    const changePasswordCheckbox = this.page.getByText('Change password');
    await changePasswordCheckbox.click();
  }

  async waitForApiResponse(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    action: () => Promise<void>,
    endpoint: string = API_ENDPOINTS.COLLECTIONS,
  ) {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes(endpoint) &&
          response.request().method() === method,
        { timeout: 90000 },
      ),
      action(),
    ]);
    return response;
  }

  async clickTableHeader(headerName: string) {
    const header = this.page.getByRole('columnheader', {
      name: headerName,
      exact: true,
    });
    await header.click();
  }

  async getTableHeaderLocatorWithFilterStatus(
    name: string,
    filter: 'asc' | 'desc',
  ) {
    return this.page.locator(`th.col-field-${name}.sort-${filter}`);
  }
}
