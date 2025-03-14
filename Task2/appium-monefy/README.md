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
