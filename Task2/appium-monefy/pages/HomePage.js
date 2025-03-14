import BasePage from "../utils/basePage.js";

class HomePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.addExpenseButton = "id=com.monefy.app.lite:id/expense_button";
    this.addIncomeButton = "id=com.monefy.app.lite:id/income_button";
    this.balanceAmount = "id=com.monefy.app.lite:id/balance_amount";
    this.expenseAmountTotal = "id=com.monefy.app.lite:id/expense_amount_text";
    this.incomeAmountTotal = "id=com.monefy.app.lite:id/income_amount_text";
    this.closePaymentOfferIcon = "id=com.monefy.app.lite:id/buttonClose";
  }

  async clickAddExpenseButton() {
    await this.click(await this.driver.$(this.addExpenseButton));
  }

  async clickAddIncomeButton() {
    await this.click(await this.driver.$(this.addIncomeButton));
  }

  /**
   * Smart function to get text from any financial element
   * @param {string} elementId - The resource ID of the element (Balance, Expense, or Income)
   * @returns {Promise<string>} - The retrieved text value
   */
  async getFinancialAmount(elementId) {
    const element = await this.driver.$(elementId);
    await element.waitForDisplayed({ timeout: 5000 }); // Wait before interacting
    return await this.getText(element);
  }

  async getRawBalanceAmount() {
    const balanceAmount = await this.driver.$(this.balanceAmount);
    return await this.getFinancialAmount(this.balanceAmount);
  }

  async getRawTotalExpenseAmount() {
    return await this.getFinancialAmount(this.expenseAmountTotal);
  }

  async getRawTotalIncomeAmount() {
    return await this.getFinancialAmount(this.incomeAmountTotal);
  }

  // Utility function to extract numeric values from financial strings
  extractBalanceNumber(text) {
    const match = text.match(/-?\$?(\d+(\.\d+)?)/); // Matches both positive & negative amounts
    return match ? parseFloat(match[1]) * (text.includes("-") ? -1 : 1) : null;
  }

  extractNumber(text) {
    const match = text.match(/-?\d+(\.\d{1,2})?/); // Matches positive & negative numbers
    return match ? parseFloat(match[0]) : NaN; // Convert to number
  }

  // Methods that return numbers instead of raw text
  async getBalance() {
    return this.extractBalanceNumber(await this.getRawBalanceAmount());
  }

  async getTotalExpenseAmount() {
    return this.extractNumber(await this.getRawTotalExpenseAmount());
  }

  async getTotalIncomeAmount() {
    return this.extractNumber(await this.getRawTotalIncomeAmount());
  }

  async closePaymentOfferIfPresent() {
    try {
      const closePaymentOfferIcon = await this.driver.$(
        "id=com.monefy.app.lite:id/buttonClose"
      );

      // Check if element exists and is displayed
      if (await closePaymentOfferIcon.isDisplayed()) {
        await closePaymentOfferIcon.waitForDisplayed({ timeout: 5000 }); // Wait up to 3 sec
        await closePaymentOfferIcon.click();
        console.log("Closed payment offer.");
      }
    } catch (error) {
      console.log("Payment offer close button not found. Skipping...");
    }
  }
}

export default HomePage;
