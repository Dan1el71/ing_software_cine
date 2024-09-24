export const SQL_COMIDAS = ({
    GET_ALL:"SELECT c.id_comida, c.nombre_comida FROM comidas c",
    ADD: "INSERT INTO comidas(nombre_comida) VALUES ($1) RETURNING id_comida",
    HOW_MANY:"SELECT COUNT (id_comida) as existe FROM comidas WHERE id_comida = $1",
    DELETE: "DELETE FROM comidas WHERE id_comida = $1",
    UPDATE: "UPDATE comidas set nombre_comida   = $2 WHERE id_comida = $1"
})