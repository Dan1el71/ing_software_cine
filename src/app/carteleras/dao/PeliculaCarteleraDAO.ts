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

  protected static async grabeloYa(datos: PeliculaCartelera, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let queHacer = 1;
        let respuBase: any;
        const cubi = await consulta.any(SQL_CARTELERAS.EXIST, 
          [ datos.idCine, datos.idPelicula, datos.fechaInicio, datos.fechaFinal]);

        if(cubi.length == 0){
          queHacer = 2;
          respuBase = await consulta.one(SQL_CARTELERAS.ADD, 
            [ datos.idCine, datos.idPelicula, datos.fechaInicio, datos.fechaFinal]);
        }
        return {queHacer, respuBase}
      })
      .then(({ queHacer, respuBase }) => {
        switch (queHacer){
          case 1:
            res.status(400).json({respuesta: "compita ya existe la cartelera ;)"});
            break;
          default:
            res.status(200).json(respuBase);
        }
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({respuesta: "Se totió mano"})
      })
  }
  
  protected static async borreloYa(datos: PeliculaCartelera, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        return consulta.result(SQL_CARTELERAS.DELETE, [datos.idPeliculaCartelera])
      })
      .then((respuesta) => {
        res.status(200).json({
          respuesta: 'La Cartelera se eliminó con éxito',
          info: respuesta.rowCount,
        })
      })
      .catch((miError) => {
        console.log(miError)
        res.status(400).json({ respuesta: 'Error al eliminar la Cartelera' })
      })
  }

  protected static async actualiceloYa(datos: PeliculaCartelera, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let respuBase: any
        respuBase = await consulta.none(SQL_CARTELERAS.UPDATE, [
          datos.idPeliculaCartelera,
          datos.idPelicula,
          datos.idCine,
          datos.fechaInicio, datos.fechaFinal])
        
        return { respuBase }
      })
      .then((respuBase) => {
        res.status(200).json({ actualizado: 'ok' })
      })
      .catch((miError) => {
        console.log(miError)
        res.status(400).json({ respuesta: 'Pailas, sql totiado' })
      })
  }

}

export default PeliculaCarteleraDAO;