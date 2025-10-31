const contractModel = require('../models/contractModel');

// Simula extração de dados do contrato
function extractContractData(raw) {
  // Para este exercício, se receber um objeto com contractNumber/clientName usa direto,
  // senão gera dados aleatórios simples
  if (raw && raw.contractNumber && raw.clientName) {
    return { contractNumber: raw.contractNumber, clientName: raw.clientName };
  }
  const num = `CT-${Math.floor(Math.random() * 90000) + 10000}`;
  const client = `Cliente ${Math.floor(Math.random() * 900)}`;
  return { contractNumber: num, clientName: client };
}

function registerContract({ raw, consultantId }) {
  const data = extractContractData(raw);
  const contract = contractModel.createContract({ ...data, consultantId });
  return contract;
}

function getContractById(id) {
  return contractModel.findById(id);
}

function listContractsForUser(user) {
  if (user.role === 'GESTOR') return contractModel.findAll();
  return contractModel.findByConsultantId(user.id);
}

module.exports = { registerContract, getContractById, listContractsForUser };
