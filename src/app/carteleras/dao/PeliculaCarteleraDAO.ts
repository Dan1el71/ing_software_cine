import { Response } from "express";
import { SQL_CARTELERAS } from "../repository/sql_carteleras";
import pool from "../../../config/connection/dbConnection";
import PeliculaCartelera from "../entity/PeliculaCartelera";

class PeliculaCarteleraDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_CARTELERAS.GET_ALL, params)
        .then((resultado) => {
            res.status(200).json(resultado.rows);
        }).catch((miErrror) => {
            console.log(miErrror);
            res.status(400).json({respuesta: "Error al obtener la información de las carteleras"});
        });

    }

}

export default PeliculaCarteleraDAO;