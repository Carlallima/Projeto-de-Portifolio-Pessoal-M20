require('dotenv').config();
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const baseUrl = "http://localhost:3000";
const token = process.env.TEST_TOKEN; // token fixo do .env

describe("Testes de Usuários", () => {

  it(" Deve registrar um novo usuário (POST /api/users)", async () => {
    const userData = {
      name: "Carla Tester",
      email: `carla_${Date.now()}@mail.com`,
      password: "123456"
    };

    const res = await request(baseUrl)
      .post("/api/users")
      .send(userData);

    
    expect([200, 201]).to.include(res.status);
  });

  it(" Deve listar usuários (GET /api/users)", async () => {
    const res = await request(baseUrl)
      .get("/api/users")
      .set("Authorization", token); // usa o token fixo

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it(" Deve falhar ao listar usuários sem token", async () => {
    const res = await request(baseUrl)
      .get("/api/users");

    expect([401, 403]).to.include(res.status);
  });

});
