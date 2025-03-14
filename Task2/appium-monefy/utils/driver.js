import { remote } from 'webdriverio';

const capabilities = {
  platformName: "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "emulator-5554",
  "appium:appPackage": "com.monefy.app.lite",
  "appium:appActivity": "com.monefy.activities.main.MainActivity_",
  "appium:noReset": true,
  "appium:fullReset": false, // Prevents uninstalling app each time
  "appium:newCommandTimeout": 240,
};

const wdOpts = {
  hostname: "localhost",
  port: 4723,
  path: "/",
  logLevel: "info",
  capabilities,
};

// Function to initialize WebDriver session without re-launching the app
export async function getDriver() {
  const driver = await remote(wdOpts);
  console.log("WebDriver session started.");
  return driver; // Return driver instance
}

// Function to close the driver after the test
export async function closeDriver(driver) {
  if (driver) {
    await driver.deleteSession();
    console.log("Driver closed successfully.");
  }
}


