export type CronoEtapa = {
  title: string;
  desde: string;
  hasta: string;
  status: string;
};

export type ConvocatoriaDB = {
  id: string;
  title: string;
  status: string;
  deadline: string;
  type: string;
  cronograma: CronoEtapa[] | null;
  createdAt: Date;
  updatedAt: Date;
};

export type EventDB = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: string;
  featured: boolean;
  attendees: number;
  createdAt: Date;
  updatedAt: Date;
};

export type StartupWithMembers = {
  id: string;
  nombreComercial: string;
  razonSocial: string;
  estado: string;
  createdAt: Date;
  convocatoria?: {
    title: string;
  };
  miembrosEquipo: {
    nombres: string;
    apellidos: string;
    email: string;
    rol: string;
  }[];
};
