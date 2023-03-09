const express = require("express");
const axios = require("axios");

const app = express();

app.set('views', './views')
app.set("view engine", "pug");

app.get('/', (req, res) => {
    res.render('index', { title: 'Juego Concentrese' });
})

app.get('/facil', (req, res) => {
    res.render('facil', { title: 'Juego Concentrese' });
})

app.get('/medio', (req, res) => {
    res.render('medio', { title: 'Juego Concentrese' });
})

app.get('/dificil', (req, res) => {
    res.render('dificil', { title: 'Juego Concentrese' });
})

app.use(express.static(__dirname + '/public'));

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Servidor escucha por el puerto:3000');;
});