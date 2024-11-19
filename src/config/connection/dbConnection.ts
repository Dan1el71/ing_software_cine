import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { optionsPG } from "./optionsPG";

dotenv.config();

const nombre = String(process.env.NOMBRE_BASE_DE_DATOS);
const usuario = String(process.env.USUARIO);
const puerto = Number(process.env.PORT);
const servidor = String(process.env.SERVIDOR);
const clave = String(process.env.CLAVE);

const pgp = pgPromise(optionsPG);
const pool = pgp({
    user: usuario,
    password: clave,
    port: puerto,
    database: nombre,
    host: servidor,
});

pool.connect().then((miCone) => {
    console.log("Conectado a la base de datos", nombre);
    miCone.done();
}).catch((miError) => {
    console.log(miError);
});

export default pool;