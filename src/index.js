const express = require('express');
const { v4: uuidv4 } = require('uuid'); 

const app = express();

app.use(express.json());

const accounts = [];

app.post('/account', (req, res) => {
    const { cpf, name} = req.body;
    accounts.push({
        id: uuidv4(),
        cpf,
        name,
        statement: []
    });
    res.status(201).send();
});

app.listen(3333);