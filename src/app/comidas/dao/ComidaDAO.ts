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
            const existe = await response.one(SQL_COMIDAS.HOW_MANY_BY_NAME, [params.nombreComida])
            if(existe.existe >= 1){
                throw new Error("Ya existe una comida con el mismo nombre")
            }
            return await response.one(SQL_COMIDAS.ADD , [params.nombreComida, params.precioComida]);
        })
        .then((response)=>{
            res.status(200).json(response);
        })
        .catch((error)=>{
            console.log(error);
            res.status(400).json({respuestaa: `Error al crear comida : ${error.message}`})  
        })
    }

    protected static async eliminarUno(params: Comida, res:Response): Promise<any>{
        await pool.task(async (response)=>{
            const existe = await response.one(SQL_COMIDAS.EXISTS_ON_MENU, [params.idComida])
            if(existe.existe >= 1){
                throw new Error("La comida esta referenciada en algun menu")
            }
            return response.result(SQL_COMIDAS.DELETE, [params.idComida]);
        })
        .then((response)=>{
            res.status(200).json({respuesta: "La comida se elemino con éxito",
            info: response.rowCount})
        })
        .catch((error)=>{
            console.error(error);
            res.status(400).json({respuesta: `Error al eliminar comida : ${error.message}`})
        })
    }

    protected static async actualizarUno(params: Comida, res : Response ): Promise<any>{
        await pool.task(async (response)=>{
            const existe = await response.one(SQL_COMIDAS.HOW_MANY, [params.idComida]);
            if(existe.existe == 1){
                return await response.none(SQL_COMIDAS.UPDATE,[params.idComida,params.nombreComida,params.precioComida]);
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

    protected static async actualizarMuchos(params: Comida, res: Response): Promise<any>{
        console.log("Entramos si señor")
        await pool.task(async (response) => {
            return await response.none(SQL_COMIDAS.UPDATE_MANY, ["%"+params.nombreComida+"%",params.precioComida]);
        })
        .then((response)=>{ 
            res.status(200).json({actualizado: "ok"})
        })
        .catch((error)=>{
            console.error(error);
            res.status(400).json({respuesta: "Error al actualizar varias comidas"})
        })
    }

    protected static async getOneById(params:any, res:Response){
        await pool.one(SQL_COMIDAS.GET_ONE_BY_ID,[params.idComida])
        .then((response)=>{ 
            res.status(200).json(response);
            console.log(response)
        })
        .catch((error)=>{
            res.status(400).json({respuesta: "Error al obtener información de las comida"})
        })
    }
    protected static async obtenerMuchosPorNombre(params: any, res: Response){
        await pool.result( SQL_COMIDAS.GET_MANY_BY_NAME,params)
        .then((response)=>{ 
            res.status(200).json(response.rows);
        })
        .catch((error)=>{
            res.status(400).json({respuesta: "Error al obtener información de las comidas"})
        })
    }
}

export default ComidaDAO;