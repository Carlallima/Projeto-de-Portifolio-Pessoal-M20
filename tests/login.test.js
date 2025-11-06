require('dotenv').config();
const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../src/app"); 

const TEST_TOKEN = process.env.TEST_TOKEN; 

describe(" Testes de Login", () => {

  it(" Deve logar com sucesso (POST /api/auth/login)", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "usuario@mail.com", //email de teste
        password: "123456"
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token", TEST_TOKEN);
  });

  it(" Deve falhar ao logar com senha errada", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "usuario@mail.com",
        password: "senha123456"
      });
    expect([400, 401]).to.include(res.status);
  });

  it(" Deve falhar ao logar com email inexistente", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "yusfd@mail.com",
        password: "123456"
      });
    expect([400, 401, 404]).to.include(res.status);
  });

});
