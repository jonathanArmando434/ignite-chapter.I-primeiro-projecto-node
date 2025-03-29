const express = require('express');
const { v4: uuidv4 } = require('uuid'); 

const app = express();

const accounts = [];

app.post('/account', (req, res) => {
    const { cpf, name} = req.body;
    accounts.push({
        id: uuidv4(),
        cpf,
        name,
        statement: []
    });
    console.log(accounts);
    res.status(201).send();
});

app.listen(3333);