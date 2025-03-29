## FinAPI - Financeira

---

### Requisitos funcionais

- [x] Deve ser possível criar conta
- [x] Deve ser possível buscar o estrato bancário do cliente
- [x] Deve ser possível realizar um depósito
- [] Deve ser possível realizar um saque
- [] Deve ser possível buscar o extrato bancário do cliente pela data
- [] Deve ser possível atualizar dados da conta do cliente
- [] Deve ser possível obter dados da conta do cliente
- [] Deve ser possível deletar uma conta

---

### Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível fazer um depósito em uma conta não existente
- [x] Não deve ser possível buscar extracto em uma conta não existente
- [] Não deve ser possível fazer saque em uma conta não existente 
- [] Não deve ser possível excluir uma conta não existente
- [] Não deve ser possível fazer o saque quando o saldo for insuficiente 