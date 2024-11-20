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
        this.apiRutaPeliculaCartelera.get("/getall/idCartelera/:idPeliculaCartelera", peliculaCarteleraControlador.dameCartelerasPorsuID);
        this.apiRutaPeliculaCartelera.get("/getall/nombreUbicacion/:nombre", peliculaCarteleraControlador.dameIdUbicacionCine);
        this.apiRutaPeliculaCartelera.get("/getall/idUbicacion/:idUbicacion", peliculaCarteleraControlador.dameCartelerasByUbicacion);
        this.apiRutaPeliculaCartelera.get("/getall/idCine/:idCine", peliculaCarteleraControlador.dameCartelerasByCine);
        this.apiRutaPeliculaCartelera.get("/getall/cine", peliculaCarteleraControlador.dameCines);
        this.apiRutaPeliculaCartelera.get("/getall/pelicula", peliculaCarteleraControlador.damePeliculas);
        this.apiRutaPeliculaCartelera.post("/addcito", peliculaCarteleraControlador.cogeTuCartelera);
        this.apiRutaPeliculaCartelera.delete("/delete/:idPeliculaCartelera", peliculaCarteleraControlador.borraTuCartelera);
        this.apiRutaPeliculaCartelera.delete("/borreloSinMiedo", peliculaCarteleraControlador.borraTodo);
        this.apiRutaPeliculaCartelera.put("/update", peliculaCarteleraControlador.actualizaTuCartelera);
        this.apiRutaPeliculaCartelera.put("/updateMasivo", peliculaCarteleraControlador.actualizaTuCarteleraMasivo);
        this.apiRutaPeliculaCartelera.put("/updateMasivoCine", peliculaCarteleraControlador.actualizaTuCarteleraMasivoCine);
        this.apiRutaPeliculaCartelera.get("/paginacion", peliculaCarteleraControlador.paginacionDeCarteleras);
    }
}

const peliculaCarteleraRuta = new PeliculaCarteleraRuta();
export default peliculaCarteleraRuta.apiRutaPeliculaCartelera;