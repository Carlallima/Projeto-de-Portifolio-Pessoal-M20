const contractModel = require('../models/contractModel');
const notificationService = require('./notificationService');
const emailService = require('./emailService');
const userModel = require('../models/userModel');

// Simula extração de dados do contrato
function extractContractData(raw) {
  // Para este exercício, se receber um objeto com os campos necessários usa direto,
  // senão gera dados aleatórios simples
  if (raw && raw.contractNumber && raw.clientName && raw.processo && raw.editalCredenciamento) {
    return {
      contractNumber: raw.contractNumber,
      clientName: raw.clientName,
      processo: raw.processo,
      editalCredenciamento: raw.editalCredenciamento,
      codigoRAE: raw.codigoRAE || '',
      empresaCredenciada: raw.empresaCredenciada || '',
      profissionalResponsavel: raw.profissionalResponsavel || '',
      quantidadeHoras: raw.quantidadeHoras || 0,
      objetivoContratacao: raw.objetivoContratacao || '',
      dataExecucaoServicos: raw.dataExecucaoServicos || '',
      localCliente: raw.localCliente || '',
      plataformaConsultoria: raw.plataformaConsultoria || ''
    };
  }

  // Geração de dados aleatórios quando não fornecidos
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 900) + 100;
  
  return {
    contractNumber: `CT-${year}/${num.toString().padStart(3, '0')}`,
    clientName: `Cliente ${Math.floor(Math.random() * 900)}`,
    processo: `PROC-${year}/${Math.floor(Math.random() * 900) + 100}`,
    editalCredenciamento: `EDITAL-CRED-${year}/${Math.floor(Math.random() * 100).toString().padStart(3, '0')}`,
    codigoRAE: `RAE-${year}-${num}`,
    empresaCredenciada: 'Empresa Exemplo',
    profissionalResponsavel: 'Profissional Exemplo',
    quantidadeHoras: 40,
    objetivoContratacao: 'Consultoria empresarial',
    dataExecucaoServicos: new Date().toISOString().split('T')[0],
    localCliente: 'São Paulo - SP',
    plataformaConsultoria: 'Teams'
  };
}

/**
 * registerContract - registra contrato e, se for gestor, pode associar a outro consultor.
 * actor: { id, role }
 */
function registerContract({ raw, consultantId, actor }) {
  const data = extractContractData(raw);

  // regras de acesso básicas
  if (!actor) {
    const err = new Error('Usuário não autenticado');
    err.status = 401;
    throw err;
  }

  // Se for consultor e passar consultantId diferente do próprio, negar
  if (actor.role === 'CONSULTOR') {
    if (consultantId && consultantId !== actor.id) {
      const err = new Error('Consultor não pode registrar contrato para outro consultor');
      err.status = 403;
      throw err;
    }
    consultantId = actor.id; // garante associação ao próprio consultor
  }

  // Se for gestor e não passar consultantId, erro
  if (actor.role === 'GESTOR' && !consultantId) {
    const err = new Error('Gestor deve informar o consultantId para atribuir o contrato');
    err.status = 400;
    throw err;
  }

  // valida se consultor existe
  const targetConsultant = userModel.findById(consultantId);
  if (!targetConsultant) {
    const err = new Error('Consultor informado não encontrado');
    err.status = 404;
    throw err;
  }

  const contract = contractModel.createContract({ ...data, consultantId });

  // Envia e-mail automático para o consultor responsável (simulado)
  try {
    const emailRecord = emailService.sendContractEmail(targetConsultant, contract);
    contract.email = emailRecord;
  } catch (e) {
    // não interrompe o fluxo principal se envio falhar na simulação
    console.error('Erro ao enviar e-mail simulado:', e && e.message);
  }

  // Se foi um gestor que cadastrou, dispare também notificação simulada via WhatsApp
  if (actor.role === 'GESTOR') {
    const message = `Novo contrato registrado: ${contract.contractNumber} - ${contract.clientName}`;
    notificationService.sendWhatsApp(targetConsultant, message);
    contract.notification = { to: targetConsultant.id, message, sentAt: new Date().toISOString() };
  }

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
