import BasePage from "../utils/basePage.js";

class TransactionPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.chooseCategoryButton =
      "id=com.monefy.app.lite:id/keyboard_action_button";
    this.button1 = "id=com.monefy.app.lite:id/buttonKeyboard1";
    this.button0 = "id=com.monefy.app.lite:id/buttonKeyboard0";
  }

  async addTransactionCategory(category) {
    console.log(`Choosing category - ${category}`);
    const categoryElement = await this.driver.$(
      `//android.widget.TextView[@resource-id="com.monefy.app.lite:id/textCategoryName" and @text="${category}"]`
    );
    if (await categoryElement.isDisplayed()) {
      await categoryElement.click();
      console.log(`Category ${category} clicked.`);
    } else {
      console.log(`Category ${category} not found.`);
    }
  }

  async addIncomeAmount() {
    const inputAmount1 = await this.driver.$(this.button1);
    await inputAmount1.waitForDisplayed({ timeout: 7000 });
    await this.click(await this.driver.$(this.button1));
    await this.click(await this.driver.$(this.button0));
    await this.click(await this.driver.$(this.button0));

    // Choose category
    await this.click(await this.driver.$(this.chooseCategoryButton));
    console.log("Entered amount and navigating to choose category screen");
  }

  async addExpenseAmount() {
    const inputAmount1 = await this.driver.$(this.button1);
    await inputAmount1.waitForDisplayed({ timeout: 7000 });
    await this.click(await this.driver.$(this.button1));

    // Choose category
    await this.click(await this.driver.$(this.chooseCategoryButton));
    console.log("Entered amount and navigating to choose category screen");
  }
}

export default TransactionPage;
