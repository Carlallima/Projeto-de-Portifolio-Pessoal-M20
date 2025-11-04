const contractService = require('../services/contractService');

function register(req, res, next) {
  try {
    const actor = req.user; // { id, role }
    const {
      raw,
      consultantId,
      codigoRAE,
      empresaCredenciada,
      profissionalResponsavel,
      quantidadeHoras,
      objetivoContratacao,
      dataExecucaoServicos,
      localCliente,
      plataformaConsultoria
    } = req.body;

    const contract = contractService.registerContract({ 
      raw, 
      consultantId, 
      codigoRAE,
      empresaCredenciada,
      profissionalResponsavel,
      quantidadeHoras,
      objetivoContratacao,
      dataExecucaoServicos,
      localCliente,
      plataformaConsultoria,
      actor 
    });
    
    res.status(201).json(contract);
  } catch (err) {
    next(err);
  }
}

function list(req, res, next) {
  try {
    const user = req.user;
    const contracts = contractService.listContractsForUser(user);
    res.json(contracts);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, list };
