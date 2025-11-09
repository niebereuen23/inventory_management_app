const { Router } = require('express');
const { getIndex } = require('../controllers/index/getIndex')


const indexRouter = Router();

indexRouter.get('/', getIndex)

module.exports = { indexRouter };