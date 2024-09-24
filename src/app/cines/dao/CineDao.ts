import { Response } from "express";
import { SQL_CINES } from "../repository/Sql_cines"
import pool from "../../../config/connection/dbConnection";
import Cine from "../entity/Cine";

class CineDAO {
    // Método para obtener todos los cines
    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_CINES.GET_ALL, params)
            .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
            .catch((miError) => {
                console.error(miError);
                res.status(400).json({ respuesta: "Error al obtener la información de los cines" });
            });
    }

    // Método para agregar un nuevo cine
    protected static async grabeloYa(datos: Cine, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                let queHacer = 1;
                let respuBase: any;
                respuBase = await consulta.one(SQL_CINES.ADD, [datos.idUbicacion, datos.nombreCine]);
                return { queHacer, respuBase };
            })
            .then(({ queHacer, respuBase }) => {
                res.status(200).json(respuBase);
            })
            .catch((miError) => {
                console.error(miError);
                res.status(400).json({ respuesta: "Error al agregar el cine" });
            });
    }

    // Método para eliminar un cine
    protected static async borreloYa(datos: Cine, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                return consulta.result(SQL_CINES.DELETE, [datos.idCine]);
            })
            .then((respuesta) => {
                res.status(200).json({
                    respuesta: "El cine se eliminó con éxito",
                    info: respuesta.rowCount
                });
            })
            .catch((miError) => {
                console.error(miError);
                res.status(400).json({ respuesta: "Error al eliminar el cine" });
            });
    }

    // Método para actualizar un cine
    protected static async actualiceloYa(datos: Cine, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                let queHacer = 1;
                let respuBase: any;
                const cineExiste = await consulta.one(SQL_CINES.HOW_MANY, [datos.idCine]);
                if (cineExiste.existe == 0) {
                    queHacer = 2;
                    respuBase = await consulta.none(SQL_CINES.UPDATE, [datos.idCine, datos.idUbicacion, datos.nombreCine]);
                }
                return { queHacer, respuBase };
            })
            .then(({ queHacer }) => {
                if (queHacer === 2) {
                    res.status(200).json({ actualizado: "ok" });
                } else {
                    res.status(400).json({ respuesta: "El cine ya existe" });
                }
            })
            .catch((miError) => {
                console.error(miError);
                res.status(400).json({ respuesta: "Error al actualizar el cine" });
            });
    }
}

export default CineDAO;
