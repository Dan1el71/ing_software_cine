export const SQL_COMIDAS = ({
    GET_ALL:"SELECT c.id_comida, c.nombre_comida, c.precio_comida FROM comidas c LIMIT $1 OFFSET $2",
    ADD: "INSERT INTO comidas(nombre_comida, precio_comida) VALUES ($1,$2) RETURNING id_comida",
    HOW_MANY:"SELECT COUNT (id_comida) as existe FROM comidas WHERE id_comida = $1",
    HOW_MANY_BY_NAME:"SELECT COUNT(id_comida) as existe FROM comidas WHERE nombre_comida = $1",
    EXISTS_ON_MENU:"SELECT COUNT(id_comida) as existe FROM menu_cine WHERE id_comida = $1",
    DELETE: "DELETE FROM comidas WHERE id_comida = $1",
    UPDATE: "UPDATE comidas set nombre_comida = $2, precio_comida = $3 WHERE id_comida = $1",
    UPDATE_MANY: "UPDATE comidas set precio_comida = $2 WHERE nombre_comida LIKE $1"
})