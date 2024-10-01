import { Response, Request } from "express";
import ReservacionesDAO from "../dao/ReservacionesDAO";
import Reservacion from "../entity/Reservacion";

class ResevacionesControlador extends ReservacionesDAO{
    public obtenerReservaciones(req: Request, res: Response){
        ReservacionesDAO.obtenerTodo([], res);
    }

    public guardarReservacion(req: Request, res:Response): void{
        const objCubi: Reservacion = new Reservacion(0,0,0,0,0);
        objCubi.idCliente = req.body.idCliente;
        objCubi.idSilla = req.body.idSilla;
        objCubi.idHorario = req.body.idHorario;
        objCubi.precio = req.body.precio;
        ReservacionesDAO.guardarReservacion(objCubi, res);
    }

    public borrarReservacion(req: Request, res:Response){
        if(isNaN(Number(req.params.idReservacion))){
            res.status(400).json({message: "Y el codigo?"});
        }else{
            const codigo = Number(req.params.idReservacion);
            const objCubi: Reservacion = new Reservacion(codigo,0,0,0,0);
            ReservacionesDAO.borrarReservacion(objCubi, res);
        }
    }

    public actualizarReservacion(req: Request, res: Response){
        const objCubi: Reservacion = new Reservacion(0,0,0,0,0);
        objCubi.idReservacion = req.body.idReservacion;
        objCubi.idCliente = req.body.idCliente;
        objCubi.idSilla = req.body.idSilla;
        objCubi.idHorario = req.body.idHorario;
        objCubi.precio = req.body.precio;
        ReservacionesDAO.actualizarReservacion(objCubi, res);
    }

    public paginarReservaciones(req:Request, res:Response){
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 1;
        ReservacionesDAO.paginarReservaciones(page, limit, res);
    }

    public actualizarMasivamenteReservaciones(req: Request, res:Response){
        const like = req.body.like;
        const precio = req.body.precio;
        ReservacionesDAO.actualizarMasivamente(precio,like,res);
    }
}

const reservacionControlador = new ResevacionesControlador();
export default reservacionControlador;