export const SQL_CINES = {
  GET_ALL: "SELECT c.id_cine, c.id_ubicacion, c.nombre_cine FROM Cines c",
  
  ADD: "INSERT INTO Cines (id_ubicacion, nombre_cine) VALUES ($1, $2) RETURNING id_cine",
  
  DELETE: "DELETE FROM Cines WHERE id_cine = $1",
  
  UPDATE: "UPDATE Cines SET id_ubicacion = $2, nombre_cine = $3 WHERE id_cine = $1",
  
  HOW_MANY: "SELECT COUNT(id_cine) as existe FROM Cines WHERE id_cine = $1"
};
