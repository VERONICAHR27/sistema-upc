@echo off
echo Limpiando caché y regenerando Prisma...
echo.

echo 1. Eliminando caché de Next.js...
rmdir /s /q .next 2>nul

echo 2. Regenerando cliente de Prisma...
npx prisma generate

echo 3. Aplicando schema a la base de datos...
npx prisma db push

echo.
echo ¡Listo! Ahora ejecuta: npm run dev
pause
