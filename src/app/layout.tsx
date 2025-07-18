import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { ConvocatoriaProvider } from '@/contexts/ConvocatoriaContext';
import { EventProvider } from '@/contexts/EventContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UPC - Sistema de Innovación y Emprendimiento",
  description: "Plataforma de convocatorias, incubación y aceleración de proyectos innovadores de la Universidad Peruana de Ciencias Aplicadas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ConvocatoriaProvider>
            <EventProvider>
              {children}
            </EventProvider>
          </ConvocatoriaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
