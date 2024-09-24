import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import Reservacion from "../entity/Reservacion";
import { SQL_RESERVACIONES } from "../repository/sql_reservaciones";

class ReservacionesDAO{
    protected static async obtenerTodo(params: any, res: Response){
        await pool.result(SQL_RESERVACIONES.GET_ALL, params)
        .then((resultado) =>{
            res.status(200).json(resultado.rows);
        }).catch((miError) =>{
            console.log(miError);
            res.status(400).json({respuesta: "Error al obtener los datos de las reservaciones"});
        });
    }

    protected static async guardarReservacion(datos: Reservacion, res:Response): Promise<any>{
        await pool
            .task(async(consulta) =>{
                let queHacer = 1;
                let respuBase: any;
                const cubi = await consulta.one(SQL_RESERVACIONES.EXIST, [datos.idSilla, datos.idHorario]);
                if(cubi.existe == 0){
                    queHacer = 2;
                    respuBase = await consulta.one(SQL_RESERVACIONES.ADD, [datos.idCliente, datos.idSilla, datos.idHorario, datos.precio]);
                }
                return {queHacer, respuBase};
            })
            .then(({queHacer, respuBase}) =>{
                switch(queHacer){
                    case 1:
                        res.status(400).json({respuesta: "La reservacion ya existe"});
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            })
    }

    protected static async borrarReservacion(datos: Reservacion, res:Response): Promise<any>{
        await pool
         .task(async(consulta) =>{
            return consulta.result(SQL_RESERVACIONES.DELETE, [datos.idReservacion]);
        })
         .then((respuesta) =>{
            res.status(200).json({
                respuesta: "Reservacion eliminada con exito",
                info: respuesta.rowCount
            });
        })
         .catch((miError) =>{
            console.log(miError);
            res.status(400).json({respuesta: "Error al eliminar la reservacion"});
        });
    }

    protected static async actualizarReservacion(datos: Reservacion, res:Response): Promise<any>{
        await pool
            .task(async(consulta) =>{
                let queHacer = 1;
                let respuBase: any;
                const cubi = await consulta.one(SQL_RESERVACIONES.EXIST, [datos.idSilla, datos.idHorario]);
                if(cubi.existe == 1){
                    queHacer = 2;
                    respuBase = await consulta.one(SQL_RESERVACIONES.UPDATE, [datos.idReservacion, datos.idCliente, datos.idSilla, datos.idHorario, datos.precio]);
                }
                return {queHacer, respuBase};
            })
            .then(({queHacer, respuBase}) =>{
                switch(queHacer){
                    case 1:
                        res.status(400).json({respuesta: "La reservacion ya existe"});
                        break;
                    default:
                        res.status(200).json({actualizado: "ok"});
                        break;
                }
            })
            .catch((miError) =>{
                console.log(miError);
                res.status(400).json({respuesta: "Pailas, sql totiado"});
            })
    } 
}

export default ReservacionesDAO;