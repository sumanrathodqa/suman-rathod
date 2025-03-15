package com.petstore.base;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.junit.jupiter.api.*;

public class BaseTest {
    protected static ExtentReports extent;
    protected ExtentTest test; // Make it non-static

    @BeforeAll
    public static void setupExtent() {
        if (extent == null) {
            ExtentSparkReporter spark = new ExtentSparkReporter("test-output/ExtentReport.html");
            extent = new ExtentReports();
            extent.attachReporter(spark);
        }
    }

    @BeforeEach
    public void createTest(TestInfo testInfo) {
        test = extent.createTest(testInfo.getDisplayName()); // Initialize a new test for each test case
    }

    @AfterAll
    public static void tearDownExtent() {
        if (extent != null) {
            extent.flush();
        }
    }
}
