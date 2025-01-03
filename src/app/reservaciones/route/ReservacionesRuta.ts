import { Router } from "express";
import reservacionControlador from "../controller/ReservacionesControlador";

class ReservacionRuta{
    public apiRutaReservacion:Router;

    constructor(){
        this.apiRutaReservacion = Router();
        this.misRutas();
    }

    private misRutas(): void{
        this.apiRutaReservacion.get('/getall',reservacionControlador.obtenerReservaciones);
        this.apiRutaReservacion.post('/add', reservacionControlador.guardarReservacion);
        this.apiRutaReservacion.delete('/delete/:idReservacion', reservacionControlador.borrarReservacion);
        this.apiRutaReservacion.put('/update', reservacionControlador.actualizarReservacion);
        this.apiRutaReservacion.get('/pagination', reservacionControlador.paginarReservaciones);
        this.apiRutaReservacion.put('/updatemasivo', reservacionControlador.actualizarMasivamenteReservaciones);
        this.apiRutaReservacion.delete('/deleteall', reservacionControlador.borrarTodo);
        this.apiRutaReservacion.get('/:id',reservacionControlador.obtenerReservacionPorId)
    }
}

const reservacionRuta = new ReservacionRuta();
export default reservacionRuta.apiRutaReservacion;