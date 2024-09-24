class Comida {
    public idComida: number;
    public nombreComida: string;

    constructor( cod:number, nombre: string){
        this.idComida = cod;
        this.nombreComida = nombre;
    }
}

export default Comida;