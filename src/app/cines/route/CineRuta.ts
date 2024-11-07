import { Router } from "express";
import cineControlador from "../controller/CineControlador";

class CineRuta {
    public apiRutaCine: Router;

    constructor() {
        this.apiRutaCine = Router();
        this.misRutas();
    }

    private misRutas(): void {
        this.apiRutaCine.get("/getall", cineControlador.dameCines);
        this.apiRutaCine.post("/add", cineControlador.cogeTuCine);
        this.apiRutaCine.delete("/delete/:idCine", cineControlador.borraTuCine);
        this.apiRutaCine.put("/update", cineControlador.actualizaTuCine);
    }
}

const cineRuta = new CineRuta();
export default cineRuta.apiRutaCine;
