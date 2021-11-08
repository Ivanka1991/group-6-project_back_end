const express = require('express')
const router = express.Router()

const transactions = require('../../controllers/transactions/transactions')

const { authentication, controllerWrapper } = require('../../middlewares')

router.get(
  '/getExpenseByMonth',
  authentication,
  controllerWrapper(transactions.getExpenseByMonth),
)

router.get(
  '/getIncomeByMonth',
  authentication,
  controllerWrapper(transactions.getIncomeByMonth),
)

module.exports = router
