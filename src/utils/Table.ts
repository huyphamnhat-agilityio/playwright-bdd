import { Locator, Page } from '@playwright/test';

export class Table {
  private table: Locator;

  constructor(
    private page: Page,
    private rootSelector: string,
  ) {
    this.table = this.page.locator(this.rootSelector);
  }

  /**
   * Returns all table rows (excluding header)
   */
  async getRows(): Promise<string[][]> {
    const rowLocator = this.table.locator('tbody tr');
    const rowCount = await rowLocator.count();
    const rows: string[][] = [];

    for (let i = 0; i < rowCount; i++) {
      const cells = rowLocator.nth(i).locator('td');
      rows.push(await cells.allTextContents());
    }

    return rows;
  }

  /**
   * Returns all text values of a column using a column selector.
   * Example: "email" => td.col-field-email
   */
  async getColumnValues(columnKey: string): Promise<string[]> {
    return await this.table
      .locator(`td.col-field-${columnKey}`)
      .allTextContents();
  }

  /**
   * Clicks a table header using a header selector.
   */
  async clickHeader(headerName: string): Promise<void> {
    await this.table
      .getByRole('columnheader', {
        name: headerName,
        exact: true,
      })
      .click();
  }

  /**
   * Returns number of data rows
   */
  async getRowCount(): Promise<number> {
    return await this.table.locator('tbody tr').count();
  }
}
