class Reservacion{
    public idReservacion: number;
    public idCliente: number;
    public idSilla: number;
    public idHorario: number;
    public precio: number;

    constructor(cod:number, cli: number, sil: number, hor: number, pre: number){
        this.idReservacion = cod;
        this.idCliente = cli;
        this.idSilla = sil;
        this.idHorario = hor;
        this.precio = pre;
    } 
}

export default Reservacion;