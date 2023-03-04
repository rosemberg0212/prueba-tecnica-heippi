# Iniciar el programa de manera local

## 1-clonar repositorio

```
git clone
```
## 2-Descargar modulos y dependencias
```
npm i
```
## 3-Crear archivo ENV
en la carpeta raiz del programa crear un archivo .env para configurar las variables de entorno

## 4-Configurar variables de entorno
en la misma raiz del programa se encuentra un archivo llamado .example.env con las variables que necesita la api para su correcto funcionamiento, copiar y pegar estas variables en el archivo .env previamente creado

## 5-Iniciar api con cualquiera de los dos comandos
```
nodemon app 
node app