import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import Cine from "../src/app/cines/entity/Cine";
import dotenv from "dotenv";

dotenv.config({
    path: "variables.env", // Configuración del entorno
});

const port = process.env.HOST_PORT || 3123;
const miUrl = `http://localhost:${port}`;

describe("GET Cines", () => {
    test("Prueba de status", async () => {
        const respuesta = await request(miUrl).get("/cine/getall");
        expect(respuesta.statusCode).toBe(200);
    });

    test("Prueba de paginacion con 1 elemento", async () => {
        const respuesta = await request(miUrl).get("/cine/getpages?page=1&limit=1");
        expect(respuesta.body).toHaveLength(1);
    });

    test("Prueba de paginacion con 50 elementos", async () => {
        const respuesta = await request(miUrl).get("/cine/getpages?page=1&limit=50");
        expect(respuesta.body).toHaveLength(50);
    });

    test("Prueba de contenido", async () => {
        const respuesta = await request(miUrl).get("/cine/getall");
        expect(respuesta.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    idCine: expect.any(Number),
                    idUbicacion: expect.any(Number),
                    nombreCine: expect.any(String),
                }),
            ])
        );
    });

    test("Prueba obtener un cine por ID", async () => {
      const respuesta = await request(miUrl).get("/cine/getcine/1");
      expect(respuesta.body).toEqual(
        expect.objectContaining({
            idCine: expect.any(Number),
            idUbicacion: expect.any(Number),
            nombreCine: expect.any(String),
        })
      );
    });
});

let idCineCreado: number = 0;

describe("POST Cines", () => {
    const objCine: Cine = new Cine(0, 1, `Cine Prueba ${Math.random()}`); 

    test("Probando status code nuevo cine", async () => {
        const respuesta = await request(miUrl).post("/cine/add").send(objCine);
        idCineCreado = respuesta.body.idCine; // Almacena el ID para pruebas posteriores
        expect(respuesta.statusCode).toBe(200);
    });

    test("Error al crear un cine existente", async () => {
        const respuesta = await request(miUrl).post("/cine/add").send(objCine);
        expect(respuesta.statusCode).toBe(400); // Asume que el servidor valida duplicados
    });

    test("Probando contenido del cine creado", async () => {
      const respuesta = await request(miUrl).get(`/cine/getcine/${idCineCreado}`);
      expect(respuesta.body).toEqual(
            expect.objectContaining({
                idCine: idCineCreado,
                idUbicacion: objCine.idUbicacion,
                nombreCine: objCine.nombreCine,
            }),
      );
    });

});

let idCineActualizao: number = 0;

describe("PUT Cines", () => {
    const objCineActualizado : Cine = new Cine(1,3,"cine Actualizado");


    test("Actualiza un cine existente", async () => {
        const respuesta = await request(miUrl).put("/cine/update").send(objCineActualizado);
        idCineActualizao = respuesta.body.idCine; // Almacena el ID para pruebas posteriores
        expect(respuesta.statusCode).toBe(200);
    });

    test("Confirma que el cine fue actualizado", async () => {
      const respuesta = await request(miUrl).get(`/cine/getcine/${objCineActualizado.idCine}`);
        expect.objectContaining({
          idCine: idCineActualizao,
          idUbicacion: objCineActualizado.idUbicacion,
          nombreCine: objCineActualizado.nombreCine,
        })

    });
});

describe("DELETE Cines", () => {
    test("Elimina un cine existente", async () => {
        const respuesta = await request(miUrl).delete(`/cine/delete/${idCineCreado}`);
        expect(respuesta.statusCode).toBe(200);
    });

    test("Error al eliminar un cine inexistente", async () => {
        const respuesta = await request(miUrl).delete("/cine/delete/9999");
        expect(respuesta.statusCode).toBe(404); // Asume que el servidor devuelve 404 si no existe
    });
});

describe("PUT Actualización Masiva de Cines", () => {
  const objCine = { idCine: 1, idUbicacion: 3, nombreCine: "masiva cines" };

  test("Realiza una actualización masiva de cines", async () => {
      const respuesta = await request(miUrl)
          .put("/cine/massiveUpdate")
          .send({ idCine:objCine.idCine, idUbicacion:objCine.idUbicacion, nombreCine:objCine.nombreCine, patronBusqueda: "m" });
      expect(respuesta.statusCode).toBe(200);
  });
});

describe("DELETE Todos los Cines", () => {
    test("Elimina todos los cines", async () => {
        const respuesta = await request(miUrl).delete("/cine/deleteall");
        expect(respuesta.statusCode).toBe(200);
    });
});


