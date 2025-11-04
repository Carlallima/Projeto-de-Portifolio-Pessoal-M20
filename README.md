# API de Automação de Contratos

Projeto que implementa uma API REST em Node.js/Express para automatizar a extração, gestão e distribuição de informações de contratos.

Arquitetura
- Linguagem: Node.js
- Framework: Express
- Arquitetura em camadas: `routes`, `controllers`, `services`, `models`.
- Persistência: banco de dados em memória (arrays) para usuários e contratos.
- Autenticação: JWT com middleware de `authenticate` e autorização por `role` (GESTOR/CONSULTOR).
- Documentação: Swagger/OpenAPI em `resources/swagger.yaml`, servida em `/api-docs`.

Principais funcionalidades
- Registro de usuários (Consultores e Gestores).
- Autenticação via `/auth/login` retornando token JWT.
- Registro de contrato que simula extração de dados (número do contrato e nome do cliente) e associa ao consultor logado.
- Registro de contrato que simula extração de dados (número do contrato e nome do cliente) e associa ao consultor logado. Se o cadastro for feito por um Gestor, ele pode atribuir o contrato a um consultor (passando `consultantId`) e a API irá simular o envio de uma mensagem via WhatsApp para o consultor responsável.
- Listagem de contratos: Gestores veem todos; Consultores veem apenas seus contratos.

Instalação

1. Instale dependências:

```powershell
npm install
```

2. Execute em modo desenvolvimento:

```powershell
npm run dev
```

Como usar

- Registre um usuário (POST /users) com body { name, email, password, role } onde role é `GESTOR` ou `CONSULTOR`.
- Faça login (POST /auth/login) com { email, password } para receber um token JWT.
- Use o header `Authorization: Bearer <token>` para endpoints protegidos.
- Registre contratos (POST /contracts) — se enviar body.raw com { contractNumber, clientName } serão usados; caso contrário serão gerados valores simulados. O contrato será associado ao consultor logado.

Observações de design
- A persistência em memória foi escolhida para simplicidade e foco no fluxo de autenticação e autorização.
- Para produção, troque o armazenamento por um banco de dados real e armazene senhas com hash.

Arquivo de especificação
- `resources/swagger.yaml` — usado pelo Swagger UI exposto em `/api-docs`.

Próximos passos sugeridos
- Persistência em banco real (Postgres/Mongo).
- Hash de senhas (bcrypt).
- Validação de payloads (Joi ou express-validator).
- Testes automatizados.
