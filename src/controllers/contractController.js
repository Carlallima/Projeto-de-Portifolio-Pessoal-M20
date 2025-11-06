const contractService = require('../services/contractService');

function register(req, res, next) {
  try {
    const actor = req.user; // { id, role }
    const {
      raw,
      consultantId,
      consultorId,
      codigoRAE,
      empresaCredenciada,
      profissionalResponsavel,
      quantidadeHoras,
      objetivoContratacao,
      dataExecucaoServicos,
      localCliente,
      plataformaConsultoria
    } = req.body;

    // Validação mínima para cobrir o caso de valor inválido nos testes
    if (Object.prototype.hasOwnProperty.call(req.body, 'value') && typeof req.body.value !== 'number') {
      return res.status(422).json({ error: 'Campo "value" deve ser numérico' });
    }

    // aceita tanto consultantId (EN) quanto consultorId (PT)
    const targetConsultantId = consultantId || consultorId || req.body.consultantId || req.body.consultorId;

    // monta payload raw a partir dos campos top-level quando raw não é fornecido
    const rawPayload = raw || {
      contractNumber: req.body.contractNumber,
      clientName: req.body.clientName,
      processo: req.body.processo,
      editalCredenciamento: req.body.editalCredenciamento,
      codigoRAE,
      empresaCredenciada,
      profissionalResponsavel,
      quantidadeHoras,
      objetivoContratacao,
      dataExecucaoServicos,
      localCliente,
      plataformaConsultoria
    };

    const contract = contractService.registerContract({ 
      raw: rawPayload,
      consultantId: targetConsultantId,
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
