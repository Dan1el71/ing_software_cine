import request from "supertest";
import { afterAll } from "@jest/globals";
import { describe, test, expect } from "@jest/globals";
import PeliculaCartelera from "../src/app/carteleras/entity/PeliculaCartelera";
import { API_URL } from "./config";

const miUrl = API_URL + '/billboard'

describe("GET Carteleras", () => {
    test("Prueba de status", async () => {
        const respuesta = await request(miUrl).get("/getall");
        expect(respuesta.statusCode).toBe(200);
    });

    test("Prueba de pagincacion con 1 elemento", async () => {
        const respuesta = await request(miUrl).get("/paginacion?page=1&limit=1");
        expect(respuesta.body.data).toHaveLength(1);
    });

    test("Prueba de paginacion con 100 elementos", async () => {
        const respuesta = await request(miUrl).get("/paginacion?page=1&limit=100");
        expect(respuesta.body.data).toHaveLength(100);
    });

    test("Prueba de contenido", async () => {
        const respuesta = await request(miUrl).get("/getall");
        expect(respuesta.body[0]).toEqual(
            expect.objectContaining({
                idPeliculaCartelera: expect.any(Number),
                idPelicula: expect.any(Number),
                idCine: expect.any(Number),
                fechaInicio: expect.any(String),
                fechaFinal: expect.any(String)
            }),
        );
    });

});

const objCubi = new PeliculaCartelera(0, 9, 10, new Date(), new Date());
describe("POST Cartelera", () => {
    let idCartelera: Number = 0;
    test("Probando status code nueva cartelera", async () => {
        const respuesta = await request(miUrl).post("/addcito").send(objCubi);
        idCartelera = respuesta.body.idPeliculaCartelera;
        expect(respuesta.statusCode).toBe(200);
    });
    afterAll(async () => {
        await request(miUrl).delete("/delete/" + idCartelera)
    })

    test("Probando status code comida existente", async () => {
        const respuesta = await request(miUrl).post("/addcito").send(objCubi);
        expect(respuesta.statusCode).toBe(409);
    });

});

describe("PUT Carteleras", () => {
    const objCubi = new PeliculaCartelera(0, 1, 13, new Date(), new Date());
    let idPeliculaCartelera: Number = 0;

    beforeAll(async () =>{
        const respuesta = await request(miUrl).post("/addcito").send(objCubi);
        idPeliculaCartelera = respuesta.body.idPeliculaCartelera;
    })
    test("Probando status code", async () => {
        const respuesta = await request(miUrl).put("/update").send(objCubi);
        expect(respuesta.statusCode).toBe(200);
    });

    test("Probando contenido", async () => {
        const respuesta = await request(miUrl).get(`/getall/idCartelera/${idPeliculaCartelera}`);
        expect(respuesta.body[0]).toEqual(
            expect.objectContaining({
                idPeliculaCartelera: idPeliculaCartelera,
                nombrePelicula: expect.any(String),
                nombreUbicacion: expect.any(String),
                fechaInicio: expect.any(String),
                fechaFinal: expect.any(String)
            })
        );
    });
    afterAll(async () => {
        await request(miUrl).delete("/delete/" + idPeliculaCartelera)
    })

});

describe("DELETE Carteleras", () => {
    const objCubi = new PeliculaCartelera(0, 1, 13, new Date(), new Date());
    let idPeliculaCartelera: Number = 0;

    beforeAll(async () =>{
        const respuesta = await request(miUrl).post("/addcito").send(objCubi);
        idPeliculaCartelera = respuesta.body.idPeliculaCartelera;
    })
    test("Probando status code", async () => {
        const respuesta = await request(miUrl).delete(`/delete/${idPeliculaCartelera}`);
        expect(respuesta.statusCode).toBe(200);
    });

    test("Comprobar comida eliminada", async () => {
        const respuesta = await request(miUrl).get(`/getall/idCartelera/${idPeliculaCartelera}`);
        expect(respuesta.statusCode).toBe(200);
        expect(respuesta.body).toHaveLength(0);
    });
});