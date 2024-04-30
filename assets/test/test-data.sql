USE [app_aif]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 30/04/2024 9:08:41 ******/
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
/****** Object:  Table [dbo].[Empresa]    Script Date: 30/04/2024 9:08:41 ******/
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
/****** Object:  Table [dbo].[FacturaVenta]    Script Date: 30/04/2024 9:08:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FacturaVenta](
	[empresaCod] [varchar](20) NOT NULL,
	[clienteCod] [varchar](20) NOT NULL,
	[serieCod] [varchar](10) NOT NULL,
	[facturaVentaNum] [int] NOT NULL,
	[bloqueada] [bit] NOT NULL,
	[fechaEmision] [date] NOT NULL,
 CONSTRAINT [PK_FacturaVenta] PRIMARY KEY CLUSTERED 
(
	[facturaVentaNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FacturaVentaLinea]    Script Date: 30/04/2024 9:08:41 ******/
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
	[tipoIVACod] [varchar](10) NOT NULL,
	[tipoIRPFCod] [varchar](10) NOT NULL,
 CONSTRAINT [PK_FacturaVentaLinea] PRIMARY KEY CLUSTERED 
(
	[facturaVentaLineaNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Impuesto]    Script Date: 30/04/2024 9:08:41 ******/
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
/****** Object:  Table [dbo].[Proyecto]    Script Date: 30/04/2024 9:08:41 ******/
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
/****** Object:  Table [dbo].[ProyectoCertificado]    Script Date: 30/04/2024 9:08:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoCertificado](
	[proyectoCertificadoNum] [int] NOT NULL,
	[proyectoCod] [varchar](20) NOT NULL,
	[fecha] [date] NOT NULL,
	[importe] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK_ProyectoCertificado] PRIMARY KEY CLUSTERED 
(
	[proyectoCertificadoNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProyectoProducido]    Script Date: 30/04/2024 9:08:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProyectoProducido](
	[proyectoProducidoNum] [int] NOT NULL,
	[proyectoCod] [varchar](20) NOT NULL,
	[fecha] [date] NOT NULL,
	[importe] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK_ProyectoProducido] PRIMARY KEY CLUSTERED 
(
	[proyectoProducidoNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Serie]    Script Date: 30/04/2024 9:08:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Serie](
	[serieCod] [varchar](10) NOT NULL,
	[descripcion] [varchar](100) NOT NULL,
	[ultimoNumUsado] [int] NOT NULL,
 CONSTRAINT [PK_Serie] PRIMARY KEY CLUSTERED 
(
	[serieCod] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Cliente] ([clienteCod], [CIF], [razonSocial], [direccion], [CP], [municipio]) VALUES (N'001', N'12345678A', N'Empresa de Prueba', N'Calle de la Prueba, 124', N'12345', N'Ciudad de la Prueba')
GO
INSERT [dbo].[Cliente] ([clienteCod], [CIF], [razonSocial], [direccion], [CP], [municipio]) VALUES (N'002', N'12345678A', N'Empresa de Prueba', N'Calle de la Prueba, 123', N'12345', N'Ciudad de la Prueba')
GO
INSERT [dbo].[Cliente] ([clienteCod], [CIF], [razonSocial], [direccion], [CP], [municipio]) VALUES (N'CLI002', N'12345678', N'Azekia', N'Avd Prueba 23', N'41720', N'Sevilla')
GO
INSERT [dbo].[Empresa] ([empresaCod], [CIF], [razonSocial], [direccion], [CP], [municipio]) VALUES (N'E404', N'12345678A', N'Azekia', N'Avd Prueba 23', N'41020', N'Sevilla')
GO
INSERT [dbo].[Impuesto] ([impuestoCod], [tipoImpuesto], [porcentaje]) VALUES (N'IVA21', N'IVA', CAST(21.00 AS Decimal(5, 2)))
GO
INSERT [dbo].[Proyecto] ([proyectoCod], [nombre], [fechaInicio], [fechaFinPrevisto], [empresaCod], [clienteCod], [importeTotalPrevisto], [importeExtraPrevisto]) VALUES (N'PRO002', N'Proyectini', CAST(N'2024-04-04' AS Date), CAST(N'2024-07-12' AS Date), N'E404', N'CLI002', CAST(100000.00 AS Decimal(10, 2)), CAST(2034.00 AS Decimal(10, 2)))
GO
INSERT [dbo].[Serie] ([serieCod], [descripcion], [ultimoNumUsado]) VALUES (N'SER002', N'Prueba', 4)
GO
ALTER TABLE [dbo].[FacturaVenta]  WITH CHECK ADD  CONSTRAINT [FK_FacturaVenta_Cliente] FOREIGN KEY([clienteCod])
REFERENCES [dbo].[Cliente] ([clienteCod])
GO
ALTER TABLE [dbo].[FacturaVenta] CHECK CONSTRAINT [FK_FacturaVenta_Cliente]
GO
ALTER TABLE [dbo].[FacturaVenta]  WITH CHECK ADD  CONSTRAINT [FK_FacturaVenta_Empresa] FOREIGN KEY([empresaCod])
REFERENCES [dbo].[Empresa] ([empresaCod])
GO
ALTER TABLE [dbo].[FacturaVenta] CHECK CONSTRAINT [FK_FacturaVenta_Empresa]
GO
ALTER TABLE [dbo].[FacturaVenta]  WITH CHECK ADD  CONSTRAINT [FK_FacturaVenta_Serie] FOREIGN KEY([serieCod])
REFERENCES [dbo].[Serie] ([serieCod])
GO
ALTER TABLE [dbo].[FacturaVenta] CHECK CONSTRAINT [FK_FacturaVenta_Serie]
GO
ALTER TABLE [dbo].[FacturaVentaLinea]  WITH CHECK ADD  CONSTRAINT [FK_FacturaVentaLinea_IRPF] FOREIGN KEY([tipoIRPFCod])
REFERENCES [dbo].[Impuesto] ([impuestoCod])
GO
ALTER TABLE [dbo].[FacturaVentaLinea] CHECK CONSTRAINT [FK_FacturaVentaLinea_IRPF]
GO
ALTER TABLE [dbo].[FacturaVentaLinea]  WITH CHECK ADD  CONSTRAINT [FK_FacturaVentaLinea_IVA] FOREIGN KEY([tipoIVACod])
REFERENCES [dbo].[Impuesto] ([impuestoCod])
GO
ALTER TABLE [dbo].[FacturaVentaLinea] CHECK CONSTRAINT [FK_FacturaVentaLinea_IVA]
GO
ALTER TABLE [dbo].[FacturaVentaLinea]  WITH CHECK ADD  CONSTRAINT [FK_FacturaVentaLinea_Proyecto] FOREIGN KEY([proyectoCod])
REFERENCES [dbo].[Proyecto] ([proyectoCod])
GO
ALTER TABLE [dbo].[FacturaVentaLinea] CHECK CONSTRAINT [FK_FacturaVentaLinea_Proyecto]
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
ALTER TABLE [dbo].[ProyectoCertificado]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoCertificado_Proyecto] FOREIGN KEY([proyectoCod])
REFERENCES [dbo].[Proyecto] ([proyectoCod])
GO
ALTER TABLE [dbo].[ProyectoCertificado] CHECK CONSTRAINT [FK_ProyectoCertificado_Proyecto]
GO
ALTER TABLE [dbo].[ProyectoProducido]  WITH CHECK ADD  CONSTRAINT [FK_ProyectoProducido_Proyecto] FOREIGN KEY([proyectoCod])
REFERENCES [dbo].[Proyecto] ([proyectoCod])
GO
ALTER TABLE [dbo].[ProyectoProducido] CHECK CONSTRAINT [FK_ProyectoProducido_Proyecto]
GO
