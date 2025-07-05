# Proyecto Final - Alcance del equipo

## 📋 Parte 1: Setup del Repositorio

🎯 Objetivo
Configurar la infraestructura básica del proyecto en GitHub con colaboración establecida.

🎯 Entregable Parte 1
✅ Repositorio GitHub con 3 ramas: main, [Veronica], [Johel]
✅ Ambos integrantes con acceso de escritura
✅ Proyecto Next.js base funcionando en local

## 📋 Parte 2: Definir Alcance del Proyecto (30 min)

🎯 Objetivo
Establecer el problema a resolver y las historias de usuario principales.

1. ¿Qué problema específico van a resolver?
    La perdida de datos de los usuarios que son registrados mediante un formulario y el analisis de datos de los usuarios registrados y el siguimineinto de metricas de las postulaciones escogidas.
2. ¿Quiénes son los usuarios principales?
    + Admin: El administrador tendra la opcion de todo el sistema.
    + User: Tendra funcionalidades especificas.
3. ¿Cuáles son las 4-5 funcionalidades más importantes?
    + Realizar una interface de navegacion con datos relevantes del programa. 
    + Realizar una inteface para el registro de login
    + Realizar una interface para el registro de la postulacion, un formulario.
    + Dashboard de los datos ingresados de los usuarios(edad, procedencia) y la cantidad de postulaciones iniciadas, terminadas, postulaciones descartadas y postulacioness escogidas.
    + Interface de seguimiento de metricas de segumiento de los proyectos escogidos.

# 📝 Historias de Usuario - Sistema UPC

## 🎯 Problema
La pérdida de datos de los usuarios que son registrados mediante un formulario y el análisis de datos de los usuarios registrados y el seguimiento de métricas de las postulaciones escogidas.

## 👥 Usuarios
* **Admin**: El administrador tendrá la opción de todo el sistema.
* **User**: Tendrá funcionalidades específicas.

## 📱 Historias de Usuario

### **Como Admin:**

#### 🔐 Gestión del Sistema
* **Puedo acceder a un dashboard completo** para visualizar todas las métricas del sistema, incluyendo estadísticas de usuarios registrados, postulaciones por estado y análisis demográfico (edad, procedencia).

* **Puedo gestionar todos los usuarios del sistema** para crear, editar, eliminar cuentas y asignar roles específicos según las necesidades del programa.

* **Puedo monitorear el seguimiento de proyectos escogidos** a través de una interfaz especializada que me permita ver el progreso, métricas de desempeño y indicadores clave de cada postulación seleccionada.

#### 📊 Análisis de Datos
* **Puedo generar reportes detallados** de las postulaciones iniciadas, terminadas, descartadas y escogidas para tomar decisiones basadas en datos.

* **Puedo exportar datos del sistema** en diferentes formatos (Excel, PDF, CSV) para análisis externos o respaldos.

#### ⚙️ Configuración
* **Puedo configurar los parámetros del sistema** formularios de postulación y flujos de trabajo para adaptar el sistema a las necesidades del programa.

### **Como User:**

#### 🏠 Navegación y Acceso
* **Puedo acceder a una interfaz de navegación intuitiva** que me muestre información relevante del programa, requisitos y fechas importantes de manera clara y organizada.

* **Puedo registrarme e iniciar sesión** en el sistema de forma segura para acceder a mis funcionalidades específicas y mantener mis datos protegidos.

#### 📝 Postulación
* **Puedo completar un formulario de postulación** paso a paso, guardando mi progreso automáticamente para evitar la pérdida de datos y poder continuar en otro momento.

* **Puedo ver el estado de mi postulación** en tiempo real (iniciada, en revisión, terminada, descartada, escogida) para estar informado sobre el progreso de mi aplicación.

#### 📈 Seguimiento Personal
* **Puedo acceder a un panel personal** donde puedo ver mi información registrada, el historial de mis postulaciones y actualizar mis datos cuando sea necesario.

* **Puedo recibir notificaciones** sobre cambios en el estado de mi postulación o información importante del programa para mantenerme actualizado.

## 🎯 Criterios de Aceptación Generales

### Para el Admin:
- El dashboard debe mostrar métricas en tiempo real
- Los reportes deben generarse en menos de 30 segundos
- Todas las acciones administrativas deben quedar registradas en logs

### Para el User:
- El formulario debe guardar automáticamente cada 2 minutos
- La interfaz debe ser responsiva y accesible desde dispositivos móviles
- Las notificaciones deben enviarse por email y mostrarse en el sistema

## 🔄 Flujo de Trabajo Principal
1. **Usuario se registra** → Sistema valida datos → Cuenta creada
2. **Usuario completa postulación** → Sistema guarda automáticamente → Postulación enviada
3. **Admin revisa postulaciones** → Actualiza estados → Sistema notifica usuarios
4. **Admin genera reportes** → Sistema procesa datos → Reportes disponibles
5. **Seguimiento de proyectos** → Métricas actualizadas → Dashboard actualizado

### 👨‍💻 Equipo

- Verónica - [@VERONICAHR27]
- Johel - [@johelcg7]

🎯 Entregable Parte 2
✅ README.md completo con historias de usuario
✅ Problema claramente definido
✅ Mínimo 6 historias de usuario (3 por tipo de usuario)
📋 Parte 3: MVP - 2 Funcionalidades Frontend (20 min)
🎯 Objetivo
Implementar 1 funcionalidad básica e independiente por persona.

Integrante 1 (10 min):

Trabaja en rama [nombre-1]
Implementa funcionalidad básica #1
Ejemplo: página de login, lista de productos, dashboard básico
Integrante 2 (10 min):

Trabaja en rama [nombre-2]
Implementa funcionalidad básica #2
Ejemplo: formulario de registro, página de perfil, búsqueda básica
📁 Archivos independientes
Para evitar conflictos, trabajar en:

Páginas diferentes: /login vs /register
Componentes separados: LoginForm.tsx vs SearchBar.tsx

Secciones distintas de la app
✅ Requisitos mínimos por funcionalidad
UI básica: Formulario, botones, inputs necesarios
Estado local: useState para manejo básico
Navegación: Links entre páginas
Estilos: Tailwind CSS aplicado
🔄 Merge final (Últimos 5 min si da tiempo)
Cada uno hace push a su rama
Intentar merge a main (si no hay conflictos)
Si hay conflictos, dejarlo para después de clase
🎯 Entregable Parte 3
✅ 2 funcionalidades frontend básicas implementadas
✅ Cada una en ramas separadas
✅ UI funcional con navegación básica
✅ Deploy opcional si da tiempo
📝 Instrucciones de Entrega
Al terminar las 3 partes, entregar:

GitHub Repository URL
README.md con historias de usuario
2 funcionalidades implementadas en ramas separadas
Deploy URL