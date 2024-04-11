CREATE TABLE Empresa (
    empresaCod VARCHAR(20) PRIMARY KEY,
    CIF VARCHAR(20),
    razonSocial VARCHAR(100),
    direccion VARCHAR(150),
    CP VARCHAR(10),
    municipio VARCHAR(50)
);

CREATE TABLE Usuario (
    usuarioNum INTEGER PRIMARY KEY,
    nombre VARCHAR(50),
    correoElectronico VARCHAR(100),
    contraseña VARCHAR(50),
    puedeCrear BOOLEAN,
    puedeModificar BOOLEAN,
    puedeBorrar BOOLEAN
);

CREATE TABLE Cliente (
    clienteCod VARCHAR(20) PRIMARY KEY,
    CIF VARCHAR(20),
    razonSocial VARCHAR(100),
    direccion VARCHAR(150),
    CP VARCHAR(10),
    municipio VARCHAR(50)
);

CREATE TABLE Proyecto (
    proyectoCod VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100),
    fechaInicio DATE,
    fechaFinPrevisto DATE,
    empresaCod VARCHAR(20),
    clienteCod VARCHAR(20),
    importeTotalPrevisto DECIMAL(10, 2),
    importeExtraPrevisto DECIMAL(10, 2),
    FOREIGN KEY (empresaCod) REFERENCES Empresa(empresaCod),
    FOREIGN KEY (clienteCod) REFERENCES Cliente(clienteCod)
);

CREATE TABLE ProyectoProducido (
    proyectoProducidoNum INTEGER PRIMARY KEY,
    proyectoCod VARCHAR(20),
    fecha DATE,
    importe DECIMAL(10, 2),
    FOREIGN KEY (proyectoCod) REFERENCES Proyecto(proyectoCod)
);

CREATE TABLE ProyectoCertificado (
    proyectoCertificadoNum INTEGER PRIMARY KEY,
    proyectoCod VARCHAR(20),
    fecha DATE,
    importe DECIMAL(10, 2),
    FOREIGN KEY (proyectoCod) REFERENCES Proyecto(proyectoCod)
);

CREATE TABLE Serie (
    serieCod VARCHAR(10) PRIMARY KEY,
    descripcion VARCHAR(100),
    ultimoNumUsado INTEGER
);

CREATE TABLE FacturaVenta (
    empresaCod VARCHAR(20),
    serieCod VARCHAR(10),
    facturaVentaNum INTEGER,
    bloqueada BOOLEAN,
    clienteCod VARCHAR(20),
    fechaEmision DATE,
    PRIMARY KEY (empresaCod, serieCod, facturaVentaNum),
    FOREIGN KEY (empresaCod) REFERENCES Empresa(empresaCod),
    FOREIGN KEY (serieCod) REFERENCES Serie(serieCod),
    FOREIGN KEY (clienteCod) REFERENCES Cliente(clienteCod)
);

CREATE TABLE Impuestos (
    impuestosCod VARCHAR(10) PRIMARY KEY,
    tipoImpuesto VARCHAR(50),
    porcentaje DECIMAL(5, 2)
);

CREATE TABLE FacturaVentaLinea (
    empresaCod VARCHAR(20),
    serieCod VARCHAR(10),
    facturaVentaNum INTEGER,
    facturaVentaLineaNum INTEGER,
    proyectoCod VARCHAR(20),
    texto VARCHAR(150),
    cantidad DECIMAL(10, 2),
    precio DECIMAL(10, 2),
    importeBruto DECIMAL(10, 2),
    descuento DECIMAL(10, 2),
    importeDescuento DECIMAL(10, 2),
    importeNeto DECIMAL(10, 2),
    tipoIVACod VARCHAR(10),
    tipoIRPFCod VARCHAR(10),
    PRIMARY KEY (empresaCod, serieCod, facturaVentaNum, facturaVentaLineaNum),
    FOREIGN KEY (empresaCod) REFERENCES Empresa(empresaCod),
    FOREIGN KEY (serieCod) REFERENCES Serie(serieCod),
    FOREIGN KEY (facturaVentaNum) REFERENCES FacturaVenta(facturaVentaNum),
    FOREIGN KEY (proyectoCod) REFERENCES Proyecto(proyectoCod),
    FOREIGN KEY (tipoIVACod) REFERENCES Impuestos(impuestosCod),
    FOREIGN KEY (tipoIRPFCod) REFERENCES Impuestos(impuestosCod)
);
