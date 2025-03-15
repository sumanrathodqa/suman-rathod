package com.petstore.tests;

import com.aventstack.extentreports.Status;
import com.petstore.base.BaseTest;
import com.petstore.utils.ConfigReader;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.*;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PetStoreTests extends BaseTest {
    private static int petId;

    // Utility method to read JSON from a file
    private String readJsonFile(String filePath) throws IOException {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(filePath);
        if (inputStream == null) {
            throw new FileNotFoundException("File not found: " + filePath);
        }
        return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
    }


    @BeforeAll
    public static void setup() {
        RestAssured.baseURI = ConfigReader.getProperty("base.url"); // Load Base URL from config
    }

    @Test
    @Order(1)
    void testAddPet() throws IOException, URISyntaxException {
        String requestBody = readJsonFile("jsons/addPet.json");
        System.out.println("Request Body for Adding Pet: " + requestBody);
        test.log(Status.INFO, "Request Body: " + requestBody);

        Response response = given()
                .header("Content-Type", "application/json")
                .body(requestBody)
                .when()
                .post("/pet");

        response.then().statusCode(anyOf(is(200), is(201)));

        petId = response.jsonPath().getInt("id");
        String petName = response.jsonPath().getString("name");

        System.out.println("Pet added successfully with ID: " + petId + " and Name: " + petName);
        test.log(Status.PASS, "Pet added successfully with ID: " + petId + " and Name: " + petName);
    }

    @Test
    @Order(2)
    void testGetPetById() {
        System.out.println("Retrieving pet with ID: " + petId);
        test.log(Status.INFO, "Retrieving pet with ID: " + petId);

        Response response = given()
                .header("Accept", "application/json")
                .when()
                .get("/pet/" + petId);

        response.then().statusCode(200).body("id", equalTo(petId));

        String retrievedName = response.jsonPath().getString("name");
        System.out.println("Pet retrieved successfully with Name: " + retrievedName);
        test.log(Status.PASS, "Pet retrieved successfully with Name: " + retrievedName);
    }

    @Test
    @Order(3)
    void testUpdatePet() throws IOException, URISyntaxException {
        String requestBody = readJsonFile("jsons/updatePet.json");
        System.out.println("Request Body for Updating Pet: " + requestBody);
        test.log(Status.INFO, "Request Body: " + requestBody);

        Response response = given()
                .header("Content-Type", "application/json")
                .body(requestBody)
                .when()
                .put("/pet");

        response.then().statusCode(200).body("id", equalTo(petId));

        String updatedName = response.jsonPath().getString("name");
        System.out.println("Pet updated successfully with New Name: " + updatedName);
        test.log(Status.PASS, "Pet updated successfully with New Name: " + updatedName);
    }

    @Test
    @Order(4)
    void testDeletePet() {
        System.out.println("Deleting pet with ID: " + petId);
        test.log(Status.INFO, "Deleting pet with ID: " + petId);

        Response response = given()
                .header("Accept", "application/json")
                .when()
                .delete("/pet/" + petId);

        response.then().statusCode(200);

        System.out.println("Pet deleted successfully.");
        test.log(Status.PASS, "Pet deleted successfully.");
    }
}
