const express = require('express');
const { v4: uuidv4 } = require('uuid'); 

const app = express();

app.use(express.json());

const accounts = [];

app.post('/account', (req, res) => {
    const { cpf, name} = req.body;
    const accountAlreadyExists = accounts.some(
        account => account.cpf === cpf
    );
    if(accountAlreadyExists) return res.status(400).json({ error: "CPF already exists" })
    accounts.push({
        id: uuidv4(),
        cpf,
        name,
        statement: []
    });
    return res.status(201).send();
});

app.get('/account/statement/:cpf', (req, res) => {
    const {cpf} = req.params;

    const account = accounts.find(account => account.cpf === cpf);

    if(!account) return res.status(400).json({ error: "Account not found" });

    return res.json(account.statement);
})

app.listen(3333);