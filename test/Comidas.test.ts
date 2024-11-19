import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import Comida from "../src/app/comidas/entity/Comida";
import dotenv from "dotenv";

dotenv.config({
  path: "variables.env",
});

const port = process.env.HOST_PORT || 3123;
const miUrl = `http://localhost:${port}`;
let idComida: number = 0;

describe("GET Comidas", () => {
  test("Prueba de status", async () => {
    const respuesta = await request(miUrl).get("/food/getall");
    expect(respuesta.statusCode).toBe(200);
  });

  test("Prueba de pagincacion con 1 elemento", async () => {
    const respuesta = await request(miUrl).get("/food/getall?page=1&limit=1");
    expect(respuesta.body).toHaveLength(1);
  });

  test("Prueba de pagincacion con 100 elementos", async () => {
    const respuesta = await request(miUrl).get("/food/getall?page=1&limit=100");
    expect(respuesta.body).toHaveLength(100);
  });

  test("Prueba de contenido", async () => {
    const respuesta = await request(miUrl).get("/food/getall");
    expect(respuesta.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          idComida: expect.any(Number),
          nombreComida: expect.any(String),
          precioComida: expect.any(String),
        }),
      ])
    );
  });

  test('Prueba obtener una comida por id', async () => {
    const respuesta = await request(miUrl).get('/food/get/1');
    expect(respuesta.body).toEqual(
      expect.objectContaining({
        idComida: expect.any(Number),
        nombreComida: expect.any(String),
        precioComida: expect.any(String),
      })
    );
  });
  test('Prueba obtener una comida por nombre', async () => {
    const respuesta = await request(miUrl).get('/food/getByName?nombreComida=Papas');
    expect(respuesta.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          idComida: expect.any(Number),
          nombreComida: expect.any(String),
          precioComida: expect.any(String),
        })
      ])
    );
  });
});


describe("POST Comidas", () => {
  const objCubi: Comida = new Comida(0, `Papas${Math.random()}`, 1000);

  test("Probando status code nueva comida", async () => {
    const respuesta = await request(miUrl).post("/food/add").send(objCubi);
    idComida = respuesta.body.idComida;
    expect(respuesta.statusCode).toBe(200);
  });

  test("Probando status code comida existente", async () => {
    const respuesta = await request(miUrl).post("/food/add").send(objCubi);
    expect(respuesta.statusCode).toBe(400);
  });

  test("Probando contenido comida creado", async () => {
    const respuesta = await request(miUrl).get(`/food/get/${idComida}`).send(objCubi);
    expect(respuesta.body).toEqual(
      expect.objectContaining({
        idComida: idComida,
        nombreComida: objCubi.nombreComida,
        precioComida: "$1,000.00",
      })
    );
  });
});

describe("PUT Comidas", () => {
  const objCubi: Comida = new Comida(1, "Papas2342435", 2000);
  test("Probando status code", async () => {
    const respuesta = await request(miUrl).put("/food/update").send(objCubi);
    expect(respuesta.statusCode).toBe(200);
  });

  test("Probando contenido", async () => {
    const respuesta = await request(miUrl).get("/food/get/1");
    expect(respuesta.body).toEqual(
      expect.objectContaining({
        idComida: 1,
        nombreComida: objCubi.nombreComida,
        precioComida: "$2,000.00",
      })
    );
  });
});

describe ("DELETE Comidas", () => {
  test("Probando status code", async () => {
    const respuesta = await request(miUrl).delete(`/food/delete/${idComida}`);
    expect(respuesta.statusCode).toBe(200);
  });

  test("Comprobar comida eliminada", async () => {
    const respuesta = await request(miUrl).get(`/food/get/${idComida}`);
    expect(respuesta.statusCode).toBe(400);
  });
});
