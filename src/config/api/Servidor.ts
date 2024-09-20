import cors from "cors";
import express from "express";
import morgan from "morgan";
import apiSalaRuta from "../../app/salas/route/SalaRuta";
import { apiClienteRuta } from "../../app/cliente/route/ClienteRuta";

class Servidor{
    public app: express.Application;

    constructor(){
        this.app = express();
        this.cargarConfiguracion();
        this.exponerEndPoint();
    }

    public exponerEndPoint() :void {
        this.app.use("/room", apiSalaRuta);
        this.app.use("/cliente", apiClienteRuta);
    }
    
    public cargarConfiguracion() :void {
        this.app.set("PORT",3123);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        //Tamaño máximo de archivo
        this.app.use(express.json({limit:"50mb"}));
        //Para que soporte la cantidad de caracterses URL
        this.app.use(express.urlencoded({extended:true}));
    }

    public iniciar() :void{
        this.app.listen(this.app.get("PORT"), ()=>{
            console.log("Listo me fui", this.app.get("PORT"));
        });
    }
}

export default Servidor;