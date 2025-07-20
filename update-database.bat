@echo off
echo ================================
echo  ACTUALIZANDO BASE DE DATOS
echo ================================
echo.

echo 1. Eliminando cache de Next.js...
if exist .next rmdir /s /q .next

echo.
echo 2. Regenerando cliente de Prisma...
npx prisma generate

echo.
echo 3. Aplicando cambios del schema...
npx prisma db push

echo.
echo 4. Verificando conexion...
echo Puedes probar la conexion en: http://localhost:3000/api/test-connection

echo.
echo ================================
echo  ACTUALIZACION COMPLETADA
echo ================================
echo.
echo Ahora ejecuta: npm run dev
pause
