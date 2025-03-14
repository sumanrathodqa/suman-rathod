class BasePage {
    constructor(driver) {
      this.driver = driver;
    }
  
    async click(element) {
      await element.waitForDisplayed();
      await element.click();
    }
  
    async getText(element) {
      await element.waitForDisplayed();
      return await element.getText();
    }
  }
  
  export default BasePage;

  
  