const express = require('express');
const router = express.Router();
const localController = require('../controllers/localController');
const { validarLocal, validarConsultaLocais } = require('../validators/localValidators');
const { autenticar } = require('../middlewares/auth');

//Rotas públicas
router.get('/', validarConsultaLocais, localController.listarLocais);
router.get('/:id', localController.buscarLocal);

//Rotas protegidas
router.post('/', autenticar, validarLocal, localController.criarLocal);
router.put('/:id', autenticar, validarLocal, localController.atualizarLocal);
router.delete('/:id', autenticar, localController.deletarLocal);

module.exports = router;