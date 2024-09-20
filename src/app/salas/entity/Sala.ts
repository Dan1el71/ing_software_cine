class Sala {
    public idSala: number;
    public capacidadSala: number;
    public idCine: number;

    constructor(cod: number, cap: number, cin: number) {
        this.idSala = cod;
        this.capacidadSala = cap;
        this.idCine = cin;
    }
}

export default Sala;