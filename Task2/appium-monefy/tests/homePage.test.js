import { expect } from "chai";
import { getDriver, closeDriver } from "../utils/driver.js";
import HomePage from "../pages/HomePage.js";
import { allure } from "allure-mocha/runtime";


describe("Home Page - Financial Information Tests", function () {
  this.timeout(60000); // Increase timeout to 60 seconds
  let driver, homePage;

  before(async function () {
    driver = await getDriver();
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
  });

  it("Should retrieve and log financial values", async () => {
    allure.feature("Homepage check");
    allure.story("User can check balance overview");
    allure.severity("critical");

    const balance = await homePage.getBalance();
    const totalExpense = await homePage.getTotalExpenseAmount();
    const totalIncome = await homePage.getTotalIncomeAmount();

    console.log(`Balance: ${balance}`);
    console.log(`Total Expense: ${totalExpense}`);
    console.log(`Total Income: ${totalIncome}`);

    // Assertions to validate the retrieved values
    expect(balance).to.not.be.NaN;
    expect(balance).to.be.a("number");

    expect(totalExpense).to.not.be.NaN;
    expect(totalExpense).to.be.a("number");
    expect(totalExpense).to.be.at.least(0); // Expense should not be negative

    expect(totalIncome).to.not.be.NaN;
    expect(totalIncome).to.be.a("number");
    expect(totalIncome).to.be.at.least(0); // Income should not be negative
  });
});
