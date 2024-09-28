class Persona {
  public idPersona
  public nombrePersona
  public numeroIdentidad
  public idUbicacion
  public fechaNacPersona
  public estado

  constructor(
    id: number,
    nombre: string,
    numeroIdentidad: number,
    fechaNac: Date,
    ubicacion: number,
    estado: boolean
  ) {
    this.idPersona = id
    this.nombrePersona = nombre
    this.numeroIdentidad = numeroIdentidad
    this.idUbicacion = ubicacion
    this.fechaNacPersona = fechaNac
    this.estado = estado
  }
}

export default Persona
