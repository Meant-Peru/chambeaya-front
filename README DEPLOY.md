DEPLOY FRONTEND

EN TU LOCAL:

1. Ingresar al proyecto, ubicarse en la rama main.
2. Colocar npm install.
3. Ir al archivo environment.ts, descomentar la linea export const URI = 'https://api.chambea-ya.com'; 
y comentar la linea actual export const URI = 'http://localhost:3500';
4. Colocar npm start.
5. Colocar npm run build.
6. El comando anterior generará una carpeta llamada build.
7. Sacar la carpeta llamada build a tu escritorio.
8. Cambiar de rama con git checkout -b gh-pages.
9. Eliminar todos los archivos que se encuentren aqui.
10. Ahora pegar todos los archivos que se encuentran dentro de la carpeta build al proyecto.
11. Colocar git add .
12. Colocar git commit -m "runbuild".
13. Colocar git push

EN EL SERVIDOR GOOGLE CLOUD:

1. Ingresar a Google Cloud Plattaform con el correo: chambeaya2@gmail.com y contraseña: Chambeaya2022**
2. Seleccionar la opción Consola
3. Seleccionar la instancia chya-app Compute engine llamada My first Project
4. Dirigirse al apartado Instancias de VM
5. Conectarse por medio de SSH
6. Colocar cd ../../var/www
7. Colocar cd chambeaya-front/
8. Colocar git pull
9. colocar pm2 reload 0
10. Colocar pm2 restart 0

