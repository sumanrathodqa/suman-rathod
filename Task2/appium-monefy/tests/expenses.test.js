import { getDriver, closeDriver } from "../utils/driver.js";
import TransactionPage from "../pages/TransactionPage.js";
import HomePage from "../pages/HomePage.js";
import { expect } from "chai";
import { allure } from "allure-mocha/runtime";


describe("Transaction Tests - Add expenses", function () {
  let driver;
  let transactionPage;
  let homePage;
  this.timeout(60000); // Increase timeout to 60 seconds

  before(async function () {
    driver = await getDriver();
    transactionPage = new TransactionPage(driver);
    homePage = new HomePage(driver);
  });

  after(async function () {
    if (driver) {
      await closeDriver(driver);
    }
  });

  beforeEach(async function () {
    console.log("Restarting app before test...");
    await driver.terminateApp("com.monefy.app.lite"); // Close app
    await driver.activateApp("com.monefy.app.lite"); // Open app fresh
    await driver.pause(3000); 
    await homePage.closePaymentOfferIfPresent();
    await driver.pause(2000); 
  });

  it("Should add an expense and select 'Bills' as category", async function () {
    allure.feature("Expense Transaction");
    allure.story("User adds an expense amount and verifies balance");
    allure.severity("critical");

    console.log("Starting test: Adding expense and selecting 'Bills' category");

    // Get initial balance
    await driver.pause(2000); 
    const balanceBefore = await homePage.getBalance();


    // Step 1: Navigate to expense page
    await homePage.clickAddExpenseButton();
    console.log("Navigating to expense page");
    await driver.pause(2000); 

    // Step 2: Add amount (10) and navigate to category selection
    await transactionPage.addExpenseAmount();
    console.log("Added amount and Navigating to expense categories page");

    // Step 3: Select 'Bills' category
    await transactionPage.addTransactionCategory("Bills");
    console.log("Selected 'Bills' category successfully");

    // Get updated balance
    const balanceAfter = await homePage.getBalance();
    console.log(`Balance before adding expense: ${balanceBefore}`);
    console.log(`Balance after adding expense: ${balanceAfter}`);

    // Step 4: Validate that balance decreased by 1
    expect(balanceAfter).to.equal(balanceBefore - 1);
    console.log("Balance correctly decreased by 1 after adding expense.");
  });
});
