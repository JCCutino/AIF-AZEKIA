USE [app_aif]
GO

/****** Object:  Table [dbo].[Cliente]    Script Date: 06/05/2024 10:18:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Cliente](
	[clienteCod] [varchar](20) NOT NULL,
	[CIF] [varchar](20) NOT NULL,
	[razonSocial] [varchar](100) NOT NULL,
	[direccion] [varchar](150) NOT NULL,
	[CP] [varchar](50) NOT NULL,
	[municipio] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[clienteCod] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Empresa]    Script Date: 06/05/2024 10:21:20 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Empresa](
	[empresaCod] [varchar](20) NOT NULL,
	[CIF] [varchar](20) NOT NULL,
	[razonSocial] [varchar](100) NOT NULL,
	[direccion] [varchar](150) NOT NULL,
	[CP] [varchar](10) NOT NULL,
	[municipio] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Empresa] PRIMARY KEY CLUSTERED 
(
	[empresaCod] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[FacturaVenta]    Script Date: 06/05/2024 10:21:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FacturaVenta](
	[empresaCod] [varchar](20) NOT NULL,
	[serieCod] [varchar](10) NOT NULL,
	[facturaVentaNum] [int] NOT NULL,
	[clienteCod] [varchar](20) NOT NULL,
	[fechaEmision] [date] NOT NULL,
	[bloqueada] [bit] NOT NULL,
 CONSTRAINT [PK_FacturaVenta] PRIMARY KEY CLUSTERED 
(
	[empresaCod] ASC,
	[serieCod] ASC,
	[facturaVentaNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FacturaVenta]  WITH CHECK ADD  CONSTRAINT [FK_FacturaVenta_Cliente] FOREIGN KEY([clienteCod])
REFERENCES [dbo].[Cliente] ([clienteCod])
GO

ALTER TABLE [dbo].[FacturaVenta] CHECK CONSTRAINT [FK_FacturaVenta_Cliente]
GO

ALTER TABLE [dbo].[FacturaVenta]  WITH CHECK ADD  CONSTRAINT [FK_FacturaVenta_Serie] FOREIGN KEY([empresaCod], [serieCod])
REFERENCES [dbo].[Serie] ([empresaCod], [serieCod])
GO

ALTER TABLE [dbo].[FacturaVenta] CHECK CONSTRAINT [FK_FacturaVenta_Serie]
GO

/****** Object:  Table [dbo].[FacturaVentaLinea]    Script Date: 06/05/2024 10:21:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FacturaVentaLinea](
	[empresaCod] [varchar](20) NOT NULL,
	[serieCod] [varchar](10) NOT NULL,
	[facturaVentaNum] [int] NOT NULL,
	[facturaVentaLineaNum] [int] NOT NULL,
	[proyectoCod] [varchar](20) NOT NULL,
	[texto] [varchar](150) NOT NULL,
	[cantidad] [int] NOT NULL,
	[precio] [decimal](10, 2) NOT NULL,
	[importeBruto] [decimal](10, 0) NOT NULL,
	[descuento] [decimal](10, 2) NOT NULL,
	[importeDescuento] [decimal](10, 2) NOT NULL,
	[importeNeto] [decimal](10, 2) NOT NULL,
	[tipoIVACod] [varchar](10) NULL,
	[tipoIRPFCod] [varchar](10) NULL,
 CONSTRAINT [PK_FacturaVentaLinea] PRIMARY KEY CLUSTERED 
(
	[empresaCod] ASC,
	[serieCod] ASC,
	[facturaVentaNum] ASC,
	[facturaVentaLineaNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FacturaVentaLinea]  WITH CHECK ADD  CONSTRAINT [FK_FacturaVentaLinea_FacturaVenta] FOREIGN KEY([empresaCod], [serieCod], [facturaVentaNum])
REFERENCES [dbo].[FacturaVenta] ([empresaCod], [serieCod], [facturaVentaNum])
GO

ALTER TABLE [dbo].[FacturaVentaLinea] CHECK CONSTRAINT [FK_FacturaVentaLinea_FacturaVenta]
GO

ALTER TABLE [dbo].[FacturaVentaLinea]  WITH CHECK ADD  CONSTRAINT [FK_FacturaVentaLinea_ImpuestoIRPF] FOREIGN KEY([tipoIRPFCod])
REFERENCES [dbo].[Impuesto] ([impuestoCod])
GO

ALTER TABLE [dbo].[FacturaVentaLinea] CHECK CONSTRAINT [FK_FacturaVentaLinea_ImpuestoIRPF]
GO

ALTER TABLE [dbo].[FacturaVentaLinea]  WITH CHECK ADD  CONSTRAINT [FK_FacturaVentaLinea_ImpuestoIVA] FOREIGN KEY([tipoIVACod])
REFERENCES [dbo].[Impuesto] ([impuestoCod])
GO

ALTER TABLE [dbo].[FacturaVentaLinea] CHECK CONSTRAINT [FK_FacturaVentaLinea_ImpuestoIVA]
GO

ALTER TABLE [dbo].[FacturaVentaLinea]  WITH CHECK ADD  CONSTRAINT [FK_FacturaVentaLinea_Proyecto] FOREIGN KEY([proyectoCod])
REFERENCES [dbo].[Proyecto] ([proyectoCod])
GO

ALTER TABLE [dbo].[FacturaVentaLinea] CHECK CONSTRAINT [FK_FacturaVentaLinea_Proyecto]
GO

/****** Object:  Table [dbo].[Impuesto]    Script Date: 06/05/2024 10:21:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Impuesto](
	[impuestoCod] [varchar](10) NOT NULL,
	[tipoImpuesto] [varchar](50) NOT NULL,
	[porcentaje] [decimal](5, 2) NOT NULL,
 CONSTRAINT [PK_Impuesto] PRIMARY KEY CLUSTERED 
(
	[impuestoCod] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Proyecto]    Script Date: 06/05/2024 10:22:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Proyecto](
	[proyectoCod] [varchar](20) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
	[fechaInicio] [date] NOT NULL,
	[fechaFinPrevisto] [date] NOT NULL,
	[empresaCod] [varchar](20) NOT NULL,
	[clienteCod] [varchar](20) NOT NULL,
	[importeTotalPrevisto] [decimal](10, 2) NOT NULL,
	[importeExtraPrevisto] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK_Proyecto] PRIMARY KEY CLUSTERED 
(
	[proyectoCod] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Proyecto]  WITH CHECK ADD  CONSTRAINT [FK_Proyecto_Cliente] FOREIGN KEY([clienteCod])
REFERENCES [dbo].[Cliente] ([clienteCod])
GO

ALTER TABLE [dbo].[Proyecto] CHECK CONSTRAINT [FK_Proyecto_Cliente]
GO

ALTER TABLE [dbo].[Proyecto]  WITH CHECK ADD  CONSTRAINT [FK_Proyecto_Empresa] FOREIGN KEY([empresaCod])
REFERENCES [dbo].[Empresa] ([empresaCod])
GO

ALTER TABLE [dbo].[Proyecto] CHECK CONSTRAINT [FK_Proyecto_Empresa]
GO


/****** Object:  Table [dbo].[ProyectoCertificado]    Script Date: 06/05/2024 10:22:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ProyectoCertificado](
	[proyectoCod] [varchar](20) NOT NULL,
	[fecha] [date] NOT NULL,
	[importe] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK_ProyectoCertificado_1] PRIMARY KEY CLUSTERED 
(
	[proyectoCod] ASC,
	[fecha] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ProyectoCertificado]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoCertificado_Proyecto] FOREIGN KEY([proyectoCod])
REFERENCES [dbo].[Proyecto] ([proyectoCod])
GO

ALTER TABLE [dbo].[ProyectoCertificado] CHECK CONSTRAINT [FK_ProyectoCertificado_Proyecto]
GO


/****** Object:  Table [dbo].[ProyectoProducido]    Script Date: 06/05/2024 10:22:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ProyectoProducido](
	[proyectoCod] [varchar](20) NOT NULL,
	[fecha] [date] NOT NULL,
	[importe] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK_ProyectoProducido_1] PRIMARY KEY CLUSTERED 
(
	[proyectoCod] ASC,
	[fecha] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ProyectoProducido]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoProducido_Proyecto] FOREIGN KEY([proyectoCod])
REFERENCES [dbo].[Proyecto] ([proyectoCod])
GO

ALTER TABLE [dbo].[ProyectoProducido] CHECK CONSTRAINT [FK_ProyectoProducido_Proyecto]
GO


/****** Object:  Table [dbo].[Serie]    Script Date: 06/05/2024 10:22:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Serie](
	[empresaCod] [varchar](20) NOT NULL,
	[serieCod] [varchar](10) NOT NULL,
	[descripcion] [varchar](100) NOT NULL,
	[ultimoNumUsado] [int] NOT NULL,
 CONSTRAINT [PK_Serie] PRIMARY KEY CLUSTERED 
(
	[empresaCod] ASC,
	[serieCod] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Serie]  WITH CHECK ADD  CONSTRAINT [FK_Serie_Empresa] FOREIGN KEY([empresaCod])
REFERENCES [dbo].[Empresa] ([empresaCod])
GO

ALTER TABLE [dbo].[Serie] CHECK CONSTRAINT [FK_Serie_Empresa]
GO


