# Appium Monefy Automation Framework

## Overview
This is an Appium automation framework designed to test the Monefy application.

## Prerequisites
- Ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- Appium (v2.0.0 or later)
- Android Emulator
- Java Development Kit (JDK) if not installed

Before running the tests, ensure the following:

1. **Install the Monefy app** on your emulator.
2. Complete all preliminary setup steps within the app.
3. Ensure Appium is installed and running.
4. Connect your Android emulator or real device.

## Clone this repository:
git clone <repository_url>
cd appium-monefy

## Installation
To install dependencies, run:

```sh
npm install
```

## Running Tests
To run all tests:

```sh
npm test
```

To run an individual test (e.g., `income.test.js`):

```sh
npx mocha tests/income.test.js
```

## Generating and Viewing Allure Reports
To generate the Allure report:

```sh
npm run allure:generate
```

To open the Allure report:

```sh
npm run allure:open
```


# Monefy App Test Approach & Technology Selection

## High-Priority Tests for Homepage/Dashboard  

Ensuring the homepage displays correct and valid values is crucial for accurate financial tracking. The following high-priority test scenarios were selected:  

### 1. Correct Balance Calculation  
- Verify that the displayed balance accurately reflects all income and expense transactions.  

### 2. Accurate Expense and Income Breakdown  
- Ensure that the displayed category-wise breakdown matches the actual transactions.  

### 3. Formatting Validation  
- Confirm that the valid values are displayed.  

## End-to-End Test Scenarios  

### 1. Adding an Income Entry  
- Navigate to the income section.  
- Enter a valid income amount.  
- Select the appropriate category (e.g., Salary, Deposits).  
- Verify the updated balance correctly reflects the added income.  

### 2. Adding an Expense Entry  
- Navigate to the expense section.  
- Enter a valid expense amount.  
- Choose a category (e.g., Food, Transport).  
- Confirm that the balance is correctly reduced by the expense amount.  

## Technology Stack Selection  

### 1. Why Appium?  
- Cross-platform support – Works for both Android and iOS, ensuring broad test coverage.  
- Stability & industry adoption – A well-supported and widely used framework for mobile automation.  
- Native & hybrid app testing – Provides flexibility to test different app architectures.  

### 2. Why JavaScript?  
- Strong ecosystem – Works seamlessly with Mocha and WebDriverIO for structured and scalable tests.  
- Developer-friendly – Readable and maintainable, making automation easier for teams familiar with JavaScript.  
- Fast execution – Supports asynchronous operations efficiently, improving test speed.  

## Conclusion  
By using Appium with JavaScript, this approach ensures stable, scalable, and well-supported test automation for validating financial transactions in the Monefy app. The selected high-priority tests cover core functionalities, ensuring an accurate and user-friendly experience.  
