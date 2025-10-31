const contractService = require('../services/contractService');

function register(req, res, next) {
  try {
    const consultantId = req.user.id;
    const raw = req.body.raw;
    const contract = contractService.registerContract({ raw, consultantId });
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
