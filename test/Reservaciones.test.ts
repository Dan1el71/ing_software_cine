import request from "supertest";
import { describe, test, expect, beforeAll } from "@jest/globals";
import Reservacion from "../src/app/reservaciones/entity/Reservacion";
import { API_URL } from "./config";

const miUrl = API_URL;
let idReservacion: number = 0;

describe("GET Reservaciones", ()=>{
    test("Prueba de status", async()=>{
        const response = await request(miUrl).get("/reservation/getall");
        expect(response.statusCode).toBe(200);
    });

    test("Prueba de paginacion con 1 elemento", async() =>{
        const response = await request(miUrl).get("/reservation/pagination?limit=1&page=1");
        expect(response.body).toHaveLength(1);
    });

    test("Prueba de paginacion con 100 elementos", async() => {
        const response = await request(miUrl).get("/reservation/pagination?limit=100&page=1");
        expect(response.body).toHaveLength(100);
    });

    test("Prueba de contenido", async() =>{
        const response = await request(miUrl).get("/reservation/getall");
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    precio: expect.any(String),
                    idReservacion: expect.any(Number),
                    idCliente: expect.any(Number),
                    idSilla: expect.any(Number),
                    idHorario: expect.any(Number)
                })
            ])
        )
    });

    test("Prueba obtener una reservacion por id", async()=>{
        const response = await request(miUrl).get("/reservation/6");
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    precio: expect.any(String),
                    idReservacion: expect.any(Number),
                    nombrePersona: expect.any(String),
                    idSilla: expect.any(Number),
                    idHorario: expect.any(Number)
                })
            ])
        )
    });
})
const obj: Reservacion = new Reservacion(0,56,56,100,10000);
describe("POST Reservaciones", () =>{
    let idReservacion: Number;
    test("Probando status code nueva reservacion", async () =>{
        const response = await request(miUrl).post("/reservation/add").send({
            nombrePersona: "56",
            idSilla: 56,
            idHorario: 100,
            precio: 10000
        });
        idReservacion = response.body.idReservacion;
        expect(response.statusCode).toBe(200);
    });

    test("Probando status code reservacion existente", async()=>{
        const response = await request(miUrl).post("/reservation/add").send(obj);
        expect(response.statusCode).toBe(400);
    });

    test("Probando contenido reservacion creado", async()=>{
        const response = await request(miUrl).get(`/reservation/get/${idReservacion}`);
        expect(response.body[0]).toEqual(
            expect.objectContaining({
                precio: expect.any(String),
                idReservacion: idReservacion,
                idCliente: expect.any(Number),
                idSilla: expect.any(Number),
                idHorario: expect.any(Number)
            })
        )
    });
})

describe("PUT Reservaciones", () =>{

    test("Probando status code", async() =>{
        const response = await request(miUrl).put("/reservation/update").send({
            idReservacion: 6,
            nombrePersona: "56",
            idSilla: 64,
            idHorario: 77,
            precio: 30000
        })
        console.log(response.body);
        expect(response.statusCode).toBe(200);
    })

    test("Probando contenido reservacion creado", async()=>{
        const response = await request(miUrl).get(`/reservation/get/6`);
        console.log(response.body);
        expect(response.body[0]).toEqual(
            expect.objectContaining({
                precio: expect.any(String),
                idReservacion: 6,
                idCliente: expect.any(Number),
                idSilla: expect.any(Number),
                idHorario: expect.any(Number)
            })
        )
    });
})

describe("DELETE Reservaciones", () =>{
    test("Probando status code", async () => {
        const respuesta = await request(miUrl).delete(`/reservation/delete/${idReservacion}`);
        expect(respuesta.statusCode).toBe(200);
      });

    test("Comprobar reservacion eliminada", async () =>{
        const response = await request(miUrl).get(`/reservation/get/${idReservacion}`);
        expect(response.body).toHaveLength(0);
    });
})