require('dotenv').config();
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../src/app'); 

const baseUrl = "http://localhost:3000";
const token = process.env.TEST_TOKEN; // token fixo do .env

describe(" Testes de Emails", () => {

  it(" Deve enviar email (POST /api/emails/send)", async () => {
    const emailData = {
      to: "teste@example.com",
      subject: "Teste automatizado",
      body: "Mensagem de teste via API"
    };

    const res = await request(baseUrl)
      .post("/api/emails/send")
      .set("Authorization", token)
      .send(emailData);

    expect([200, 201, 202]).to.include(res.status);
  });

  it(" Deve falhar ao enviar email sem token", async () => {
    const emailData = {
      to: "teste@example.com",
      subject: "Falha de autenticação",
      body: "Sem token"
    };

    const res = await request(baseUrl)
      .post("/api/emails/send")
      .send(emailData);

    expect([401, 403]).to.include(res.status);
  });

  it(" Deve falhar ao enviar email com dados faltando", async () => {
    const res = await request(baseUrl)
      .post("/api/emails/send")
      .set("Authorization", token)
      .send({ to: "", subject: "", body: "" });

    expect([400, 422]).to.include(res.status);
  });

  it("Deve listar histórico de emails (GET /api/emails)", async () => {
    const res = await request(baseUrl)
      .get("/api/emails")
      .set("Authorization", token);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("Deve falhar ao listar emails sem token", async () => {
    const res = await request(baseUrl)
      .get("/api/emails");

    expect([401, 403]).to.include(res.status);
  });

});

