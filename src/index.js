const express = require('express');
const { v4: uuidv4 } = require('uuid'); 

const app = express();

app.use(express.json());

const accounts = [];

const verifyAccountExistsByCPF = (req, res, next) => {
    const {cpf} = req.headers;

    const account = accounts.find(account => account.cpf === cpf);

    if(!account) return res.status(400).json({ error: "Account not found" });

    req.account = account

    next();
}

const getBalance = (statements) => {
    const balance = statements.reduce((acc, statement) =>{
        if(statement.type === 'credit') return acc + statement.amount
        return acc - statement.amount 
    }, 0);

    return balance;
}

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
        statements: []
    });

    return res.status(201).send();
});

app.get('/account/statement', verifyAccountExistsByCPF, (req, res) => {
    const { account } = req;
    return res.json(account.statements);
})

app.post('/account/deposit', verifyAccountExistsByCPF, (req, res) =>{
    const { amount, description } = req.body; 

    const { account } = req;

    const statement = {
        amount,
        createdAt: new Date(),
        type: 'credit',
        description
    }

    account.statements.push(statement);

    return res.json(account.statements);
})

app.post('/account/withdraw', verifyAccountExistsByCPF, (req, res) => {
    const { amount } = req.body;
    const { account } = req;

    const balance = getBalance(account.statements);

    if(balance < amount) return res.status(400).json({ error: 'You can not withdraw this amount' });

    const statement = {
        amount,
        createdAt: new Date(),
        type: 'debit'
    }

    account.statements.push(statement);

    return res.json(account.statements);
}) 

app.get('/account/statement/date', verifyAccountExistsByCPF, (req, res) => {
    const { account } = req;
    const { date } = req.query;
    const formatDate = new Date(date + " 00:00");
    const statementsFiltred = account.statements.filter(statement => statement.createdAt.toDateString() === new Date(formatDate).toDateString()); 
    return res.json(statementsFiltred);
})

app.listen(3333);