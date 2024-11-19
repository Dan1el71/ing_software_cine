import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import PeliculaCartelera from "../src/app/carteleras/entity/PeliculaCartelera";

describe("GET Carteleras", () => {
    test("Probando status code", async () => {
        const miUrl = "http://localhost:3123";
        const respuesta = await request(miUrl).get("/billboard/getall");
        expect(respuesta.statusCode).toBe(200);
    });
});

describe("POST Carteleras", () => {
    test("Probando status code", async () => {
        const objCubi: PeliculaCartelera = new PeliculaCartelera(0,1,2,new Date(),new Date());
        const miUrl = "http://localhost:3123";
        const respuesta = await request(miUrl).post("/billboard/addcito")
        .send(objCubi);
        expect(respuesta.statusCode).toBe(409);
    });
});

describe("PUT Carteleras", () => {
    test("Probando status code", async () => {
        const objCubi: PeliculaCartelera = new PeliculaCartelera(0,1,2,new Date(),new Date());
        const miUrl = "http://localhost:3123";
        const respuesta = await request(miUrl).put("/billboard/update")
        .send(objCubi);
        expect(respuesta.statusCode).toBe(200);
    });
});
