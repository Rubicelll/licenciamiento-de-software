drop database licencias;
create database licencias;
  use licencias;
  create table personal(
    idPersonal smallint primary key auto_increment,
    tipoPersonal varchar (30) not null
  );
  create table productosSoftware(
    idProducto smallint primary key auto_increment,
    nombreProducto varchar (60) not null,
    version varchar(10) not null,
    requisitosInstalacion varchar (1000) not null,
    cantidadProductos int not null
  );
  create table categoriasSoftware(
    idCategoria smallint primary key auto_increment,
    nombreCategoria varchar (30)  not null
  );
  create table productosCategorias(
    idProducto smallint not null,
    idCategoria smallint not null,
    foreign key (idProducto) references productosSoftware(idProducto),
    foreign key (idCategoria) references categoriasSoftware(idCategoria)
  );
  create table disponibilidadProducto(
    idProducto smallint not null,
    idPersonal smallint not null,
    foreign key (idProducto) references productosSoftware(idProducto),
    foreign key (idPersonal) references personal(idPersonal)
  );
  create table tipoLicencia(
    idTipo smallint primary key auto_increment,
    tipoLicencia varchar (30)
  );
  create table modoAdquisicion(
    idAdquisicion smallint primary key auto_increment,
    modoAdquisicion varchar (30) not null
  );
  create table licencias(
    idLicencia smallint primary key auto_increment,
    nombreLicencia varchar (60) not null,
    cantidadLicencias int not null,
    vigenciaInicio date not null,
    vigenciaTermino date not null,
    numeroContrado varchar (30),
    precioAdquisicion decimal,
    fabricante varchar (60),
    proveedor varchar (60),
    impacto varchar (250) not null,
    comentarios varchar (250),
    idTipo smallint not null,
    idAdquisicion smallint not null,
    foreign key (idTipo) references tipoLicencia(idTipo),
    foreign key (idAdquisicion) references modoAdquisicion(idAdquisicion)
  );
  create table disponibilidadLicencia(
    idLicencia smallint not null,
    idPersonal smallint not null,
    foreign key (idLicencia) references licencias(idLicencia),
    foreign key (idPersonal) references personal(idPersonal)
  );
  create table licenciasProductos(
    idLicencia smallint not null,
    idProducto smallint not null,
    foreign key (idLicencia) references licencias(idLicencia),
    foreign key (idProducto) references productosSoftware(idProducto)
  );
