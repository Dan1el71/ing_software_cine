class Cine {
  public idCine: number;
  public idUbicacion: number;
  public nombreCine: string;

  constructor(idCine: number, idUbicacion: number, nombreCine: string) {
      this.idCine = idCine;
      this.idUbicacion = idUbicacion;
      this.nombreCine = nombreCine;
  }
}

export default Cine;
