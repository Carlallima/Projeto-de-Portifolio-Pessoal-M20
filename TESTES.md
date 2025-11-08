# 🧪 Guia de Testes - API de Contratos

## 📋 Tipos de Testes

Este projeto possui dois tipos de testes automatizados:

### 1️⃣ **Testes de Integração (Mocha + Chai + Supertest)**
- Testam se os endpoints da API funcionam corretamente
- Verificam validações, autenticação e respostas
- Localização: `tests/*.test.js`

### 2️⃣ **Testes de Performance (K6)**
- Testam a performance da API sob carga
- Simulam múltiplos usuários simultâneos
- Localização: `tests/testK6/*.test.js`

---

## 🚀 Como Rodar os Testes Localmente

### **Pré-requisitos:**
- Node.js v22 ou superior
- K6 instalado ([Download K6](https://k6.io/docs/get-started/installation/))

### **Passo 1: Instalar dependências**
```bash
npm install
```

### **Passo 2: Iniciar o servidor (Terminal 1)**
```bash
npm start
```

Você verá:
```
Servidor rodando na porta 3000
```

### **Passo 3: Rodar os testes (Terminal 2)**

**Testes Mocha (Integração):**
```bash
npm test
```

**Testes K6 (Performance):**
```bash
# Teste de Login
k6 run tests/testK6/login.test.js

# Teste de Usuários
k6 run -e TEST_TOKEN=123456789teste tests/testK6/users.test.js

# Teste de Contratos
k6 run -e TEST_TOKEN=123456789teste tests/testK6/contracts.test.js

# Teste de Emails
k6 run -e TEST_TOKEN=123456789teste tests/testK6/email.test.js
```

**Ou use o script batch (Windows):**
```bash
.\run-k6-tests.bat
```

---

## 🤖 GitHub Actions (CI/CD)

Os testes rodam automaticamente a cada push ou Pull Request na branch `main`, `master` ou `testes-performance`.

**Workflow:** `.github/workflows/ci_testes.yml`

**O que o CI faz:**
1. ✅ Instala dependências
2. ✅ Cria arquivo `.env` com variáveis de teste
3. ✅ Inicia o servidor
4. ✅ Roda testes Mocha
5. ✅ Instala K6
6. ✅ Roda todos os testes K6

---

## 📊 Resultados dos Testes

### **Testes Mocha:**
- Total: **13 testes**
- Tempo médio: **~250ms**
- Relatório HTML: `mochawesome-report/mochawesome.html`

### **Testes K6:**
| Teste | VUs | Duração | Requisições/s | Tempo Médio |
|-------|-----|---------|---------------|-------------|
| Login | 10 | 10s | ~2,450 | ~3.95ms |
| Usuários | 5 | 10s | ~4.97 | ~2.16ms |
| Contratos | 5 | 10s | ~4.98 | ~1.72ms |
| Emails | 5 | 10s | ~4.97 | ~2.33ms |

---

## 🔧 Configuração

### **Variáveis de Ambiente (`.env`):**
```properties
PORT=3000
JWT_SECRET=segredo_super_secreto
TEST_TOKEN=123456789teste
```

### **Scripts do package.json:**
```json
{
  "scripts": {
    "start": "node src/index.js",
    "test": "mocha --timeout 10000 --reporter mochawesome --file tests/setup.js -- tests/**/*.test.js",
    "test:k6": "k6 run -e TEST_TOKEN=123456789teste tests/testK6/contracts.test.js"
  }
}
```

---

## 📁 Estrutura de Testes

```
tests/
├── setup.js              # Configuração inicial dos testes Mocha
├── users.test.js         # Testes de usuários (Mocha)
├── contracts.test.js     # Testes de contratos (Mocha)
├── email.test.js         # Testes de emails (Mocha)
└── testK6/
    ├── login.test.js     # Teste de performance - Login
    ├── users.test.js     # Teste de performance - Usuários
    ├── contracts.test.js # Teste de performance - Contratos
    └── email.test.js     # Teste de performance - Emails
```

---

## ❓ Troubleshooting

### **Erro: "EADDRINUSE" (porta em uso)**
**Solução:** Mate o processo na porta 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### **Erro: "No connection could be made"**
**Solução:** Certifique-se de que o servidor está rodando em `http://localhost:3000`

### **Testes K6 falhando 100%**
**Solução:** 
1. Verifique se o servidor está rodando
2. Verifique se o `TEST_TOKEN` está correto no `.env`
3. Teste manualmente: `curl http://localhost:3000/api/users`

---

## 📚 Documentação Adicional

- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Supertest](https://github.com/visionmedia/supertest)
- [K6](https://k6.io/docs/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

## 👨‍💻 Autor

Desenvolvido como parte do Módulo 20 - Projeto de Portfólio Pessoal

---

## 📄 Licença

ISC
