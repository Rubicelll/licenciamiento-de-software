INSERT INTO personal(tipoPersonal)
  VALUES
  ("ESTUDIANTES"),
  ("PROFESORES"),
  ("DIRECTIVOS"),
  ("ADMINISTRATIVOS"),
  ("REDES"),
  ("SISTEMAS");

INSERT INTO categoriasSoftware(nombreCategoria)
  VALUES
  ("OFIMATICA"),
  ("REDES"),
  ("MANTENIMIENTO"),
  ("DISEÑO"),
  ("PROGRAMACIÓN"),
  ("MATEMATICAS"),
  ("SIMULACIÓN");

INSERT INTO productosSoftware(nombreProducto, version, requisitosInstalacion, cantidadProductos)
  VALUES
  ("Packet Tracer","10.0","WIN 7, 1GB ROM, 1GB RAM",10),
  ("Adove XD","7.0","WIN 7, 1GB ROM, 1GB RAM",5),
  ("NetBeans","3.0","WIN 7, 1GB ROM, 1GB RAM",15),
  ("Office","15.0","WIN 7, 1GB ROM, 1GB RAM",20);

INSERT INTO productosCategorias
  VALUES
  (1,2),
  (1,7),
  (2,4),
  (3,5),
  (4,1);

INSERT INTO disponibilidadProducto
  VALUES
  (1,1),
  (1,2),
  (1,4),
  (2,1),
  (2,2),
  (3,1),
  (3,2),
  (4,1),
  (4,2),
  (4,3),
  (4,4);
INSERT INTO tipoLicencia(tipoLicencia)
VALUES
("COMERCIAL"),
("LIBRE"),
("DEMO"),
("POR VOLUMEN");

INSERT INTO modoAdquisicion(modoAdquisicion)
VALUES
("MENSUAL"),
("ANUAL"),
("MULTIANUAL"),
("PERPETUA");

INSERT INTO licencias
VALUES
(NULL,'Academia de Cisco',1,'01-02-2020','12-12-2020','511551',8000,'CISCO','511551','Capacitar y actualizar a docentes y estudiantes con las nuevas tecnologías de CISCO','YA SE ENVIO SOLICITUD DE PAGO',1,2);
