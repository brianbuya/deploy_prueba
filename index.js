// const express = require('express'); es igual al de abajo
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv'; 
dotenv.config({ path: 'variables.env' })

const app = express();

//conectar la base de datos
db.authenticate()
    .then( () => console.log('Base datos conectada'))
    .catch( error => console.log(error));

//puerto y host para la app
const host = process.env.HOST || '0.0.0.0';

//Definir puerto
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";

    next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//definir la carpeta publica
app.use(express.static('public'));

//agrega Router
app.use('/', router);

app.listen(port, host, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})