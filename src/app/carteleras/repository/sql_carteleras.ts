export const SQL_CARTELERAS = ({
    GET_ALL: "SELECT id_pelicula_cartelera, id_cine, id_pelicula, fecha_inicio, fecha_final \
                FROM peliculas_carteleras",

    GET_ID_UBICACION_CINE_BY_UBICACION_NOMBRE:  "SELECT DISTINCT u.id_ubicacion \
                FROM peliculas_carteleras p \
                JOIN Cines c  ON p.id_cine = c.id_cine \
                JOIN Ubicaciones u  ON u.id_ubicacion = c.id_ubicacion \
                WHERE  u.nombre_ubicacion = $1",

    GET_CARTELERAS_BY_UBICACION: "SELECT p.id_pelicula_cartelera, u.nombre_ubicacion, pe.nombre_pelicula, fecha_inicio, fecha_final \
                FROM peliculas_carteleras p \
                JOIN Cines c  ON p.id_cine = c.id_cine \
                JOIN Ubicaciones u  ON u.id_ubicacion = c.id_ubicacion \
                JOIN peliculas pe ON p.id_pelicula = pe.id_pelicula \
                WHERE c.id_ubicacion = $1" ,

    GET_CARTELERAS_BY_CINE: "SELECT p.id_pelicula_cartelera, u.nombre_ubicacion, pe.nombre_pelicula, fecha_inicio, fecha_final \
                FROM peliculas_carteleras p \
                JOIN Cines c  ON p.id_cine = c.id_cine \
                JOIN Ubicaciones u  ON u.id_ubicacion = c.id_ubicacion \
                JOIN peliculas pe ON p.id_pelicula = pe.id_pelicula \
                WHERE c.id_cine = $1" ,       
               
    ADD: "INSERT INTO peliculas_carteleras(id_cine, id_pelicula, fecha_inicio, fecha_final) \
    VALUES($1,$2,$3,$4) RETURNING id_pelicula_cartelera, id_cine",

    GET_CINES:  "SELECT  c.id_cine, u.nombre_ubicacion \
                FROM peliculas_carteleras p \
                JOIN Cines c  ON p.id_cine = c.id_cine \
                JOIN Ubicaciones u  ON u.id_ubicacion = c.id_ubicacion",

    GET_PELICULAS: "SELECT id_pelicula, nombre_pelicula FROM peliculas",

    EXIST: "SELECT id_pelicula_cartelera FROM peliculas_carteleras \
        WHERE id_cine = $1 AND id_pelicula = $2 AND fecha_inicio = $3",
    
    DELETE: "DELETE FROM peliculas_carteleras WHERE id_pelicula_cartelera = $1",

    DELETE_ALL: "DELETE FROM peliculas_carteleras",

    EXIST_ID: "SELECT COUNT(id_pelicula_cartelera) as exist FROM peliculas_carteleras \
            WHERE id_pelicula_cartelera = $1",
    
    EXIST_OTHER_TABLE: "SELECT COUNT(id_pelicula_cartelera) exist FROM laotraTabla \
            WHERE id_pelicula_cartelera = $1",

    UPDATE: "UPDATE peliculas_carteleras SET id_cine = $2, id_pelicula = $3, \
            fecha_inicio = $4, fecha_final = $5 WHERE id_pelicula_cartelera  = $1 \
            RETURNING id_pelicula_cartelera",
    
    UPDATE_MASIVE: "UPDATE peliculas_carteleras SET id_cine = $2, id_pelicula = $3, \
            fecha_inicio = $4, fecha_final = $5 \
            WHERE cast(id_pelicula_cartelera AS TEXT) LIKE '%$1'",

    UPDATE_MASIVE2: "UPDATE peliculas_carteleras SET id_cine = $1",

    PAGINATION: "SELECT p.id_pelicula_cartelera, u.nombre_ubicacion, pe.nombre_pelicula, fecha_inicio, fecha_final \
                FROM peliculas_carteleras p \
                JOIN Cines c  ON p.id_cine = c.id_cine \
                JOIN Ubicaciones u  ON u.id_ubicacion = c.id_ubicacion \
                JOIN peliculas pe ON p.id_pelicula = pe.id_pelicula \
                LIMIT $1 OFFSET $2",
    COUNT: "SELECT COUNT(p.id_pelicula_cartelera) FROM peliculas_carteleras p"

})