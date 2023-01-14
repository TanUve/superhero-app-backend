const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 3001;
let superheroes = require('./data.json');
const { response } = require('express');
app.use(bodyParser.json());
app.use(cors());

const getSuper = (id) => {

    const superheroe = superheroes.filter((oneSuper) => oneSuper.id === id);
    return superheroe;
}


app.get('/superheroes', (req, res) => {
    res.status(200).json(superheroes);
});


app.get('/superheroes/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const superheroe = getSuper(id);
    if (superheroe.length < 1) {
        response.status(404).json();
    }
    res.status(200).json(superheroe[0]);
});


app.post('/superheroes', (req, res) => {
    const info = req.body;

    if (!("name" in info) || !("publisher" in info) || !("alter_ego" in info) || !("first_appearance" in info) || !("image" in info) || !("characters" in info)) {
        res.status(400).json();
    }

    const supersId = superheroes.map((sh) => sh.id);
    const id = supersId[supersId.length - 1] + 1;

    const superheroe = {
        id: id,
        "name": info["name"],
        "publisher": info["publisher"],
        "alter_ego": info["alter_ego"],
        "first_appearance": info["first_appearance"],
        "image": info["image"],
        "characters": info["characters"]
    }

    if (!(typeof superheroe.name === "string") || !(superheroe.name.length > 1)) {
        return res.status(400).json();
    }

    if (!(typeof superheroe.publisher === "string") || !(superheroe.publisher.length > 1)) {
        return res.status(400).json();
    }

    if (!(typeof superheroe.alter_ego === "string") || !(superheroe.alter_ego.length > 1)) {
        return res.status(400).json();
    }

    if (!(typeof superheroe.first_appearance === "string") || !(superheroe.first_appearance.length > 1)) {
        return res.status(400).json();
    }

    if (!(typeof superheroe.image === "string") || !(superheroe.image.length > 1)) {
        return res.status(400).json();
    }

    if (!(typeof superheroe.characters === "string") || !(superheroe.characters.length > 1)) {
        return res.status(400).json();
    }

    superheroes.push(superheroe);
    res.status(201).json(superheroe);


});



app.patch('/superheroes/:id', (req, res) => {

    let info = req.body;
    const id = parseInt(req.params.id);
    let currentSuperhero = getSuper(id);


    if (currentSuperhero.length < 1) {
        response.status(404).json();
    }

    currentSuperhero = currentSuperhero[0];


    if ("alter_ego" in info) {
        currentSuperhero.alter_ego = info["alter_ego"];
    }

    if ("first_appearance" in info) {
        currentSuperhero.first_appearance = info["first_appearance"];
    }

    if ("image" in info) {
        currentSuperhero.image = info["image"];
    }

    if ("characters" in info) {
        currentSuperhero.characters = info["characters"];
    }

    superheroes = superheroes.filter((sh) => sh.id !== currentSuperhero.id);

    superheroes.push(currentSuperhero);

    res.status(200).json(currentSuperhero);

});

app.delete('/superheroes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    superheroes = superheroes.filter((superhero) => superhero.id !== id);
    res.status(204).json(); //No debería devolver nada el 204
});


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

