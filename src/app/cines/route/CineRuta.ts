import { Router } from "express";
import cineControlador from "../controller/CineControlador";

class CineRuta {
    public apiRutaCine: Router;

    constructor() {
        this.apiRutaCine = Router();
        this.misRutas();
    }

    private misRutas(): void {
        this.apiRutaCine.get("/getpages", cineControlador.dameCinesPaginados); // Nueva ruta para paginación

        this.apiRutaCine.post("/add", cineControlador.cogeTuCine);

        this.apiRutaCine.delete("/delete/:idCine", cineControlador.borraTuCine);

        this.apiRutaCine.delete("/deleteall",cineControlador.eliminaCines)
        
        this.apiRutaCine.put("/update", cineControlador.actualizaTuCine);

        this.apiRutaCine.put("/massiveUpdate", cineControlador.actualizaCinesMasivo);

        this.apiRutaCine.get("/getcine/:id", cineControlador.dameCine);

        this.apiRutaCine.get("/getall", cineControlador.dameCines);

    }
}

const cineRuta = new CineRuta();
export default cineRuta.apiRutaCine;
