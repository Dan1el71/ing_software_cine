import { Router } from "express";
import peliculaCarteleraControlador from "../controller/PeliculaCarteleraControlador";

class PeliculaCarteleraRuta {
    public apiRutaPeliculaCartelera: Router;

    constructor(){
        this.apiRutaPeliculaCartelera = Router();
        this.misRutas();
    }

    private misRutas(): void{
        this.apiRutaPeliculaCartelera.get("/getall", peliculaCarteleraControlador.dameCarteleras);
        //this.apiRutaPeliculaCartelera.post("/addcito", peliculaCarteleraControlador.cogeTuCartelera);
        //this.apiRutaPeliculaCartelera.delete("/delete/:idSala", peliculaCarteleraControlador.borraTuCartelera);
        //this.apiRutaPeliculaCartelera.put("/update", peliculaCarteleraControlador.actualizaTuCartelera);
    }
}

const peliculaCarteleraRuta = new PeliculaCarteleraRuta();
export default peliculaCarteleraRuta.apiRutaPeliculaCartelera;