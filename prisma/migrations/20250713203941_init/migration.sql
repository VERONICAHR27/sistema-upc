-- CreateTable
CREATE TABLE "startups" (
    "id" TEXT NOT NULL,
    "nombreComercial" TEXT NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "numeroFiscal" TEXT NOT NULL,
    "sitioWeb" TEXT,
    "logotipo" TEXT,
    "descripcion" TEXT NOT NULL,
    "industria" TEXT NOT NULL,
    "industriaOther" TEXT,
    "fechaFundacion" TIMESTAMP(3) NOT NULL,
    "problemaOportunidad" TEXT NOT NULL,
    "solucion" TEXT NOT NULL,
    "modeloNegocio" TEXT NOT NULL,
    "ventajaCompetitiva" TEXT NOT NULL,
    "necesidades" TEXT[],
    "necesidadesOther" TEXT,
    "programaAceleracion" TEXT NOT NULL,
    "nombrePrograma" TEXT,
    "aprendizajes" TEXT,
    "aplicacionAprendizajes" TEXT,
    "videoPresentacion" TEXT,
    "tieneVentas" TEXT NOT NULL,
    "pilotoDemo" TEXT NOT NULL,
    "ubicacionSolucion" TEXT NOT NULL,
    "montoVentas" TEXT,
    "tecnologia" TEXT NOT NULL,
    "areaDesarrollo" TEXT NOT NULL,
    "inversionExterna" TEXT NOT NULL,
    "comoSeEntero" TEXT NOT NULL,
    "comoSeEnteroOther" TEXT,
    "aceptaPrivacidad" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "startups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_members" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "tiempoCompleto" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "lugarNacimiento" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "linkedin" TEXT,
    "startupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "startups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
