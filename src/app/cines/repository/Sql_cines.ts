export const SQL_CINES = {

  GET_CINE:"SELECT c.id_cine, c.id_ubicacion, c.nombre_cine FROM Cines c WHERE c.id_cine = $1",

  GET_ALL: "SELECT c.id_cine, c.id_ubicacion, c.nombre_cine FROM Cines c",
  
  ADD: "INSERT INTO Cines (id_ubicacion, nombre_cine) VALUES ($1, $2) RETURNING id_cine",
  
  DELETE: "DELETE FROM Cines WHERE id_cine = $1",
  
  UPDATE: "UPDATE Cines SET id_ubicacion = $2, nombre_cine = $3 WHERE id_cine = $1",
  
  HOW_MANY: "SELECT COUNT(id_cine) as existe FROM Cines WHERE id_cine = $1",

  GET_PAGE: "SELECT c.id_cine, c.id_ubicacion, c.nombre_cine FROM Cines c ORDER BY c.id_cine LIMIT $1 OFFSET $2",

  CHECK_IF_EXISTS: "SELECT COUNT(*) AS total FROM Cines WHERE nombre_cine = $1 AND id_ubicacion = $2",

  CHECK_UBICACION_EXISTS: "SELECT COUNT(*) AS total FROM Ubicaciones WHERE id_ubicacion = $1",

  CHECK_IF_EXISTS_ANOTHER_ID: "SELECT COUNT(*) as existe FROM Cines WHERE nombre_cine = $1 AND id_ubicacion = $2 AND id_cine <> $3",

  GET_CINE_BY_ID:"SELECT id_cine, id_ubicacion, nombre_cine FROM Cines WHERE id_cine = $1 AND id_cine IS NOT NULL;",

  MASIVE_UPDATE:"UPDATE cines SET nombre_cine = $1, id_ubicacion = $2 WHERE nombre_cine LIKE $3;",

  CHECK_IF_USED_IN_PELICULAS_CARTELERAS: "SELECT COUNT(*) AS total FROM Peliculas_carteleras WHERE id_cine = $1",

  CHECK_IF_USED_IN_TRABAJADORES: "SELECT COUNT(*) AS total FROM Trabajadores WHERE id_cine = $1",

  CHECK_IF_USED_IN_SALAS: "SELECT COUNT(*) AS total FROM Salas WHERE id_cine = $1",
  
  CHECK_IF_USED_IN_MENU_CINE: "SELECT COUNT(*) AS total FROM Menu_cine WHERE id_cine = $1",

  DELETE_ALL:"DELETE FROM CINES"
};
