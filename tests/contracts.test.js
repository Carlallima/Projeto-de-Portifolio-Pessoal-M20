require('dotenv').config();
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../src/app'); 
const baseUrl = "http://localhost:3000";

const token = process.env.TEST_TOKEN; // pega token fixo do .env

describe(" Testes de Contratos", () => {

  it("Deve criar contrato (POST /api/contracts)", async () => {
    const contrato = {
      clientName: "Empresa XPTO",
      value: 2500,
      date: "2025-11-05"
    };
    const res = await request(baseUrl)
      .post("/api/contracts")
      .set("Authorization", token)
      .send(contrato);
    expect([200, 201]).to.include(res.status);
  });

  it(" Deve falhar ao criar contrato sem token", async () => {
    const contrato = {
      clientName: "Sem Token",
      value: 1000,
      date: "2025-11-05"
    };
    const res = await request(baseUrl)
      .post("/api/contracts")
      .send(contrato);
    expect([401, 403]).to.include(res.status);
  });

  it("Deve falhar ao criar contrato com dados inválidos", async () => {
    const contrato = { value: "mil" }; // campo faltando
    const res = await request(baseUrl)
      .post("/api/contracts")
      .set("Authorization", token)
      .send(contrato);
    expect([400, 422]).to.include(res.status);
  });

  it(" Deve listar contratos (GET /api/contracts)", async () => {
    const res = await request(baseUrl)
      .get("/api/contracts")
      .set("Authorization", token);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it(" Deve falhar ao listar contratos sem token", async () => {
    const res = await request(baseUrl)
      .get("/api/contracts");
    expect([401, 403]).to.include(res.status);
  });

});
