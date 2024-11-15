import request from "supertest";
import { describe, test, expect } from "@jest/globals";

describe("GET Comidas", () => {
    test("Probando status code", async () => {
      const miUrl = "http://localhost:3123";
      const respuesta = await request(miUrl).get("/foods/getall");
      expect(respuesta.statusCode).toBe(200);
      console.log(respuesta.body);
    });
  });