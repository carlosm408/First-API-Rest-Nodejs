const { Router } = require('express');
const { title } = require('process');
const router = Router();
const _ = require('underscore');

const movies = require('../sample.json');
console.log(movies);

router.get('/', (req, res) => {
    res.json(movies);
})

router.post('/', (req, res) => {
    const { title, director, year, raiting } = req.body;
    if (title && director && year && raiting) {
        const id = movies.length + 1;
        const newMovie = { id, ...req.body };
        movies.push(newMovie);
        res.json(movies);
    } else {
        res.send('Faltan Datos');
    }
})

router.put('/;id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, raiting } = req.body;
    if (title && director && year && raiting) {
        _.each(movies, (movie, indice) => {
            if (movie.id == id) {
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.raiting = raiting;
            }
        });
        res.json(movies);
    } else {
        res.status(500).json({ error: 'Ha ocurrido un error.' })
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(movies, (movie, indice) => {
        if (movie.id == id) {
            movies.splice(indice, 1);
        }
    })
    res.send(movies);
})

module.exports = router;