class Persona {
  public idPersona
  public nombrePersona
  public numeroIdentidad
  public idUbicacion
  public fechaNacPersona

  constructor(
    id: number,
    nombre: string,
    numeroIdentidad: number,
    fechaNac: Date,
    ubicacion: number
  ) {
    this.idPersona = id
    this.nombrePersona = nombre
    this.numeroIdentidad = numeroIdentidad
    this.idUbicacion = ubicacion
    this.fechaNacPersona = fechaNac
  }
}

export default Persona
