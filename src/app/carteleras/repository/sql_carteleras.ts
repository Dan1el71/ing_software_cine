export const SQL_CARTELERAS = ({
    GET_ALL: "SELECT id_pelicula_cartelera, id_cine, id_pelicula, fecha_inicio, fecha_final \
                FROM peliculas_carteleras",
               
    ADD: "INSERT INTO peliculas_carteleras(id_cine, id_pelicula, fecha_inicio, fecha_final) \
    VALUES($1,$2,$3,$4) RETURNING id_pelicula_cartelera",

    EXIST: "SELECT id_pelicula_cartelera FROM peliculas_carteleras \
        WHERE id_cine = $1 AND id_pelicula = $2 AND fecha_inicio = $3",
    
    DELETE: "DELETE FROM peliculas_carteleras WHERE id_pelicula_cartelera = $1",

    EXIST_ID: "SELECT COUNT(id_pelicula_cartelera) as exist FROM peliculas_carteleras \
            WHERE id_pelicula_cartelera = $1",
    
    EXIST_OTHER_TABLE: "SELECT COUNT(id_pelicula_cartelera) exist FROM laotraTabla \
            WHERE id_pelicula_cartelera = $1",

    UPDATE: "UPDATE peliculas_carteleras SET id_cine = $2, id_pelicula = $3, \
            fecha_inicio = $4, fecha_final = $5 WHERE id_pelicula_cartelera  = $1",
    
    UPDATE_MASIVE: "UPDATE peliculas_carteleras SET id_cine = $2, id_pelicula = $3, \
            fecha_inicio = $4, fecha_final = $5 \
            WHERE cast(id_pelicula_cartelera AS TEXT) LIKE '%$1'",

    PAGINATION: "SELECT id_pelicula_cartelera, id_cine, id_pelicula, fecha_inicio, fecha_final \
                FROM peliculas_carteleras LIMIT $1 OFFSET $2"

})