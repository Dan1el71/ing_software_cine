class Persona {
  public idPersona
  public nombrePersona
  public idUbicacion
  public fechaNacPersona

  constructor(id: number, nombre: string, fechaNac: Date, ubicacion: number) {
    this.idPersona = id
    this.nombrePersona = nombre
    this.idUbicacion = ubicacion
    this.fechaNacPersona = fechaNac
  }
}

export default Persona
