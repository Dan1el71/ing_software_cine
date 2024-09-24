import { Response } from "express";
import { SQL_SALAS } from "../repository/sql_salas";
import pool from "../../../config/connection/dbConnection";
import Sala from "../entity/Sala";

class SalaDAO {
    protected static async obtenerTodo(params: any, res: Response) {
        await pool.result(SQL_SALAS.GET_ALL, params)
        .then((resultado) => {
            res.status(200).json(resultado.rows);
        }).catch((miErrror) => {
            console.log(miErrror);
            res.status(400).json({respuesta: "Error al obtener la información de las salas"});
        });
    }

    protected static async grabeloYa(datos: Sala, res:Response): Promise<any> {
        await pool
            .task(async (consulta) =>{
                let queHacer = 1;
                let respuBase: any;
                //const cubi = await consulta.one(SQL_SALAS.HOW_MANY, [datos.idSala]);
                //if(cubi.existe == 0){
                    queHacer = 2;
                    respuBase = await consulta.one(SQL_SALAS.ADD, [datos.idSala, datos.capacidadSala, datos.idCine]);
                //}
                return {queHacer, respuBase};
            })
            .then(({queHacer, respuBase}) =>{
                switch(queHacer){
                    case 1:
                        res.status(400).json({respuesta: "La sala ya existe"});
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            })
    }

    protected static async borreloYa(datos: Sala, res: Response): Promise<any>{
        await pool
            .task(async (consulta) =>{
                return consulta.result(SQL_SALAS.DELETE, [datos.idSala]);
            })
            .then((respuesta) => {
                res.status(200).json({
                    respuesta: "La sala se eliminó con éxito",
                    info: respuesta.rowCount
                });
            })
            .catch((miError) =>{
                console.log(miError);
                res.status(400).json({respuesta: "Error al eliminar la sala"});
            });
    }

    protected static async actualiceloYa(datos: Sala, res: Response): Promise<any>{
        await pool
            .task(async (consulta) =>{
                let queHacer = 1;
                let respuBase: any;
                const cubi = await consulta.one(SQL_SALAS.HOW_MANY, [datos.idSala]);
                if(cubi.existe == 0){
                    queHacer = 2;
                    respuBase = await consulta.none(SQL_SALAS.UPDATE, [datos.idSala, datos.capacidadSala, datos.idCine]);
                }
                return {queHacer, respuBase};
            })
            .then(({queHacer, respuBase}) =>{
                switch(queHacer){
                    case 1:
                        res.status(400).json({respuesta: "Compita ya existe"});
                        break;
                    default:
                        res.status(200).json({actualizado: "ok"});
                        break;
                }
            })
            .catch((miError) => {
                console.log(miError);
                res.status(400).json({respuesta: "Pailas, sql totiado"});
            });
    }
}

export default SalaDAO;