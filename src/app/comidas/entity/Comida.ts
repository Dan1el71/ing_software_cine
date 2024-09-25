class Comida {
    public idComida: number;
    public nombreComida: string;
    public precioComida: number;

    constructor( cod:number, nombre: string, precio:number){
        this.idComida = cod;
        this.nombreComida = nombre;
        this.precioComida = precio;
    }
}

export default Comida;