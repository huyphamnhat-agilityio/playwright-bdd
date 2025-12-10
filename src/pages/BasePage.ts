import { Page } from "@playwright/test";

export class BasePage {
  constructor(public page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getTitle() {
    return await this.page.title();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("domcontentloaded");
  }
}
