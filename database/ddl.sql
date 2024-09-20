CREATE TABLE "Reservaciones" (
  "id_reservacion" integer PRIMARY KEY,
  "id_cliente" integer,
  "id_silla" int NOT NULL,
  "id_horario" int NOT NULL,
  "precio" money
);
CREATE TABLE "Ubicaciones" (
  "id_ubicacion" integer PRIMARY KEY,
  "nombre_ubicacion" varchar(255),
  "id_padre" integer
);
CREATE TABLE "Cines" (
  "id_cine" integer PRIMARY KEY,
  "id_ubicacion" integer,
  "nombre_cine" varchar(255)
);
CREATE TABLE "Peliculas_carteleras" (
  "id_pelicula_cartelera" integer PRIMARY KEY,
  "id_cine" integer,
  "id_pelicula" integer,
  "fecha_inicio" date,
  "fecha_final" date
);
CREATE TABLE "Generos" (
  "id_genero" integer PRIMARY KEY,
  "nombre_genero" varchar(255)
);
CREATE TABLE "Cargos" (
  "id_cargo" integer PRIMARY KEY,
  "nombre_cargo" varchar(255),
  "descripcion_cargo" varchar(255)
);
CREATE TABLE "Personas" (
  "id_persona" integer PRIMARY KEY,
  "nombre_persona" varchar(255),
  "id_ubicacion" integer,
  "fecha_nac_persona" date
);
CREATE TABLE "Clientes" ("id_persona" integer PRIMARY KEY);
CREATE TABLE "Trabajadores" (
  "id_persona" integer PRIMARY KEY,
  "id_cine" integer,
  "id_cargo" integer
);
CREATE TABLE "Peliculas" (
  "id_pelicula" integer PRIMARY KEY,
  "nombre_pelicula" varchar(255),
  "id_genero" integer,
  "duracion_pelicula" 
);
CREATE TABLE "Comidas" (
  "id_comida" integer PRIMARY KEY,
  "nombre_comida" varchar(255)
);
CREATE TABLE "Salas" (
  "id_sala" integer PRIMARY KEY,
  "capacidad" integer,
  "id_cine" integer
);
CREATE TABLE "Sillas" (
  "id_silla" integer PRIMARY KEY,
  "tipo_silla" integer,
  "id_sala" integer
);
CREATE TABLE "Tipos_sillas" (
  "id_tipo_silla" integer PRIMARY KEY,
  "nombre" varchar(50)
);
CREATE TABLE "Menu_cine" (
  "id_menu_cine" integer PRIMARY KEY,
  "id_comida" int,
  "id_cine" int,
  "precio" money
);
CREATE TABLE "Horarios" (
  "id_horario" int NOT NULL,
  "id_pelicula" int NOT NULL,
  "fecha" date NOT NULL,
  "hora" time NOT NULL,
  PRIMARY KEY ("id_horario")
);
CREATE TABLE "Accesos" (
  "id_acceso" integer PRIMARY KEY,
  "usuario" varchar(50) UNIQUE,
  "contraseña" varchar(100),
  "id_tipo_acceso" integer,
  "id_persona" integer
);
CREATE TABLE "Tipos_accesos" (
  "id_tipo_acceso" integer PRIMARY KEY,
  "nombre" varchar(100) UNIQUE
);
CREATE UNIQUE INDEX "unique_silla_horario" ON "Reservaciones" ("id_silla", "id_horario");
ALTER TABLE "Reservaciones"
ADD FOREIGN KEY ("id_cliente") REFERENCES "Clientes" ("id_persona");
ALTER TABLE "Reservaciones"
ADD FOREIGN KEY ("id_silla") REFERENCES "Sillas" ("id_silla");
ALTER TABLE "Reservaciones"
ADD FOREIGN KEY ("id_horario") REFERENCES "Horarios" ("id_horario");
ALTER TABLE "Ubicaciones"
ADD FOREIGN KEY ("id_padre") REFERENCES "Ubicaciones" ("id_ubicacion");
ALTER TABLE "Cines"
ADD FOREIGN KEY ("id_ubicacion") REFERENCES "Ubicaciones" ("id_ubicacion");
ALTER TABLE "Peliculas_carteleras"
ADD FOREIGN KEY ("id_cine") REFERENCES "Cines" ("id_cine");
ALTER TABLE "Peliculas_carteleras"
ADD FOREIGN KEY ("id_pelicula") REFERENCES "Peliculas" ("id_pelicula");
ALTER TABLE "Personas"
ADD FOREIGN KEY ("id_ubicacion") REFERENCES "Ubicaciones" ("id_ubicacion");
ALTER TABLE "Clientes"
ADD FOREIGN KEY ("id_persona") REFERENCES "Personas" ("id_persona");
ALTER TABLE "Trabajadores"
ADD FOREIGN KEY ("id_persona") REFERENCES "Personas" ("id_persona");
ALTER TABLE "Trabajadores"
ADD FOREIGN KEY ("id_cine") REFERENCES "Cines" ("id_cine");
ALTER TABLE "Trabajadores"
ADD FOREIGN KEY ("id_cargo") REFERENCES "Cargos" ("id_cargo");
ALTER TABLE "Peliculas"
ADD FOREIGN KEY ("id_genero") REFERENCES "Generos" ("id_genero");
ALTER TABLE "Salas"
ADD FOREIGN KEY ("id_cine") REFERENCES "Cines" ("id_cine");
ALTER TABLE "Sillas"
ADD FOREIGN KEY ("tipo_silla") REFERENCES "Tipos_sillas" ("id_tipo_silla");
ALTER TABLE "Sillas"
ADD FOREIGN KEY ("id_sala") REFERENCES "Salas" ("id_sala");
ALTER TABLE "Menu_cine"
ADD FOREIGN KEY ("id_comida") REFERENCES "Comidas" ("id_comida");
ALTER TABLE "Menu_cine"
ADD FOREIGN KEY ("id_cine") REFERENCES "Cines" ("id_cine");
ALTER TABLE "Horarios"
ADD FOREIGN KEY ("id_pelicula") REFERENCES "Peliculas" ("id_pelicula");
ALTER TABLE "Accesos"
ADD FOREIGN KEY ("id_tipo_acceso") REFERENCES "Tipos_accesos" ("id_tipo_acceso");
ALTER TABLE "Accesos"
ADD FOREIGN KEY ("id_persona") REFERENCES "Personas" ("id_persona");