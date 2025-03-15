# PetStore API Test Automation

## Overview
This project is a REST API test automation framework for testing the PetStore API. It is built using **REST Assured**, **JUnit 5**, and **Extent Reports** for logging and reporting.

## Technologies Used
- **Java 23 +**
- **Maven** (for dependency management)
- **REST Assured** (for API testing)
- **JUnit 5** (for test execution)
- **Extent Reports** (for test reporting)
- **Jackson Databind** (for JSON processing)

## Project Structure
```
petstore-api-tests/
│── src/
│   ├── main/
│   │   ├── java/com/petstore/base/BaseTest.java
│   │   ├── java/com/petstore/utils/ConfigReader.java
│   ├── test/
│   │   ├── java/com/petstore/tests/PetStoreTests.java
│   │   ├── resources/config/config.properties
│   │   ├── resources/jsons/addPet.json
│   │   ├── resources/jsons/updatePet.json
│── test-output/ExtentReport.xml
│── pom.xml
│── README.md
```

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/petstore-api-tests.git
   ```
2. Navigate to the project directory:
   ```sh
   cd petstore-api-tests
   ```
3. Build the project using Maven:
   ```sh
   mvn clean install
   ```

## Running the Tests
Execute the following command to run the test suite:
```sh
mvn test
```

## Test Cases
### 1. Add a Pet (`testAddPet`)
- Reads pet data from `jsons/addPet.json`
- Sends a `POST /pet` request
- Validates response status `200` or `201`
- Extracts and stores pet ID for future tests

### 2. Get Pet by ID (`testGetPetById`)
- Sends a `GET /pet/{id}` request
- Validates response status `200`
- Confirms pet ID matches stored value

### 3. Update Pet (`testUpdatePet`)
- Reads update data from `jsons/updatePet.json`
- Sends a `PUT /pet` request
- Validates response status `200`
- Confirms pet ID remains unchanged

### 4. Delete Pet (`testDeletePet`)
- Sends a `DELETE /pet/{id}` request
- Validates response status `200`

## Reporting
After running the tests, an **Extent Report** is generated. The report can be found in:
```
test-output/ExtentReport.xml
```
Open the `ExtentReport.xml` file in a browser to view detailed test execution results.

## Configuration
The base URL for the API is set in `ConfigReader.java` and is loaded from a configuration file.

## Dependencies
This project uses the following dependencies:
- REST Assured (5.3.0)
- JUnit 5 (5.9.2)
- Extent Reports (5.0.9)
- Jackson Databind (2.15.0)

## Approach
This project is a **scalable, POM-based test automation framework** for the PetStore API, built using **REST Assured**, **JUnit 5**, and **Extent Reports**. The framework supports **data-driven testing** by storing API request data in **JSON files** and configuration settings in a **config.properties** file. This ensures flexibility and adaptability to different environments.

## Tech Stack Choice
- **Java 23+** for modern and efficient test execution.
- **Maven** for structured dependency management and scalability.
- **REST Assured** for fluent API request handling and validation.
- **JUnit 5** for robust test execution and assertions.
- **Extent Reports** for comprehensive reporting with structured logs.
- **Jackson Databind** for seamless JSON parsing, enabling dynamic test data.

## Why This Approach?
This setup ensures **modularity, reusability, and scalability** by separating test logic, configurations, and test data. The **POM-based structure** allows easy integration with CI/CD pipelines, making it suitable for large-scale API testing.


