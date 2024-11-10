class PeliculaCartelera {
  public idPeliculaCartelera: number
  public idCine: number
  public idPelicula: number
  public fechaInicio: Date
  public fechaFinal: Date

  constructor(
    cod: number,
    cin: number,
    pel: number,
    fecIni: Date,
    fecFin: Date
  ) {
    this.idPeliculaCartelera = cod
    this.idCine = cin
    this.idPelicula = pel
    this.fechaInicio = fecIni
    this.fechaFinal = fecFin
  }
}
export default PeliculaCartelera
