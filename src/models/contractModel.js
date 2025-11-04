const { v4: uuidv4 } = require('uuid');

const contracts = [];

function createContract({ 
  contractNumber, 
  clientName, 
  consultantId, 
  processo, 
  editalCredenciamento,
  codigoRAE,
  empresaCredenciada,
  profissionalResponsavel,
  quantidadeHoras,
  objetivoContratacao,
  dataExecucaoServicos,
  localCliente,
  plataformaConsultoria
}) {
  const contract = {
    id: uuidv4(),
    contractNumber,
    clientName,
    consultantId,
    processo,
    editalCredenciamento,
    codigoRAE,
    empresaCredenciada,
    profissionalResponsavel,
    quantidadeHoras,
    objetivoContratacao,
    dataExecucaoServicos,
    localCliente,
    plataformaConsultoria,
    createdAt: new Date().toISOString(),
  };
  contracts.push(contract);
  return contract;
}

function findById(id) {
  return contracts.find(c => c.id === id);
}

function findAll() {
  return contracts;
}

function findByConsultantId(consultantId) {
  return contracts.filter(c => c.consultantId === consultantId);
}

module.exports = { createContract, findById, findAll, findByConsultantId };
