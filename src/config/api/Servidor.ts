import cors from "cors";
import express from "express";
import morgan from "morgan";
import apiSalaRuta from "../../app/salas/route/SalaRuta";
import apiRutaComida from "../../app/comidas/route/ComidaRuta";
import apiReservacionRuta from "../../app/reservaciones/route/ReservacionesRuta";
import { apiClienteRuta } from "../../app/cliente/route/ClienteRuta";
import apiPeliculaCarteleraRuta from "../../app/carteleras/route/PeliculaCarteleraRuta"

class Servidor {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.cargarConfiguracion();
        this.exponerEndPoint();
    }

    public exponerEndPoint(): void {
        this.app.use("/room", apiSalaRuta);
        this.app.use("/food", apiRutaComida);
        this.app.use("/reservation", apiReservacionRuta);
        this.app.use("/cliente", apiClienteRuta);
        this.app.use("/billboard", apiPeliculaCarteleraRuta);
    }

    public cargarConfiguracion(): void {
        this.app.set("PORT", 3123);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        // Tamaño máximo de archivo
        this.app.use(express.json({ limit: "50mb" }));
        // Para que soporte la cantidad de caracteres URL
        this.app.use(express.urlencoded({ extended: true }));
    }

    public iniciar(): void {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Listo me fui", this.app.get("PORT"));
        });
    }
}

export default Servidor;
