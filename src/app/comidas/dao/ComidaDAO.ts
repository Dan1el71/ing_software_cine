import { Response } from "express";
import {SQL_COMIDAS} from "../repository/sql_comidas";
import pool from "../../../config/connection/dbConnection";
import Comida from "../entity/Comida";

class ComidaDAO {
    protected static async obtenerTodo(params: any, res: Response){
        await pool.result( SQL_COMIDAS.GET_ALL,params)
        .then((response)=>{
            res.status(200).json(response.rows);
        })
        .catch((error)=>{
            res.status(400).json({respuesta: "Error al obtener información de las comidas"})
        })
    }

    protected static async saveOne(params : Comida, res: Response): Promise<any>{
        await pool.task (async (response)=>{
            return await response.one(SQL_COMIDAS.ADD , [params.nombreComida]);
        })
        .then((response)=>{
            res.status(200).json(response);
        })
        .catch((error)=>{
            console.log(error);
            res.status(400).json({respuestaa: "Error al crear comida"})
        })
    }

    protected static async eliminarUno(params: Comida, res:Response): Promise<any>{
        await pool.task(async (response)=>{
            return response.result(SQL_COMIDAS.DELETE, [params.idComida]);
        })
        .then((response)=>{
            res.status(200).json({respuesta: "La comida se elemino con éxito",
            info: response.rowCount})
        })
        .catch((error)=>{
            console.error(error);
            res.status(400).json({respuesta: "Error al eliminar comida"})
        })
    }

    protected static async actualizarUno(params: Comida, res : Response ): Promise<any>{
        await pool.task(async (response)=>{
            const existe = await response.one(SQL_COMIDAS.HOW_MANY, [params.idComida]);
            if(existe.existe == 1){
                return await response.none(SQL_COMIDAS.UPDATE,[params.idComida,params.nombreComida]);
            }
            else{
                throw new Error("La comida con el codigo suministrado no existe")
            }
        })
        .then((response)=>{
            res.status(200).json({actulizado: "ok"})
        })
        .catch((error)=>{
            console.error(error);
            res.status(400).json({respuesta : `Error al actuaizar comida : ${error.message}`})
        })
    }
}

export default ComidaDAO;