const addIncome = require('./addIncome')
const addExpense = require('./addExpense')
const removeById = require('./removeById')
const getIncomeDetail = require('./getIncomeDetail')
const getExpenseDetail = require('./getExpenseDetail')
const getExpenseByDate = require('./getExpenseByDate')
const getIncomeByDate = require('./getIncomeByDate')
const getExpensedByMonth = require('./getExpensedByMonth')
const getIncomeByMonth = require('./getIncomeByMonth')
const getLast = require('./getLast')

module.exports = {
  addIncome,
  addExpense,
  removeById,
  getIncomeDetail,
  getExpenseDetail,
  getExpenseByDate,
  getIncomeByDate,
  getExpensedByMonth,
  getIncomeByMonth,
  getLast,
}