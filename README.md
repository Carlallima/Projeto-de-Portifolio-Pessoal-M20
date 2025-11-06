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

2. Execute a API (desenvolvimento):

```powershell
npm start
```

Swagger

- UI: http://localhost:3000/api-docs
- JSON: http://localhost:3000/swagger.json

Executar testes

1) Com a API já ligada (recomendado):

```powershell
npm start
npm test
```

2) Sem iniciar a API manualmente:

```powershell
npm test
```

Observação: os testes detectam se a porta 3000 está ocupada e só iniciam o servidor se necessário, evitando o erro EADDRINUSE.

Como usar (base path /api)

- Registre usuário (POST /api/users): body { name, email, password, role? } — se role não vier, assume CONSULTOR.
- Login (POST /api/auth/login): body { email, password } — retorna token.
- Autenticação: header `Authorization: Bearer <token>`.
- Registrar contratos (POST /api/contracts):
	- Aceita dados em `raw` ou diretamente no corpo (contractNumber, clientName, processo, editalCredenciamento, etc.).
	- Se Gestor, enviar consultantId para atribuir; caso contrário, o contrato é do consultor autenticado.
	- Após o cadastro, é enviado e-mail automático ao consultor com os dados do contrato.
- Emails:
	- Enviar (POST /api/emails/send): aceita tanto { destinatario, assunto, mensagem } quanto { to, subject, body }.
	- Listar (GET /api/emails): retorna histórico em memória.

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
