const { User } = require('../../models')

const setBalance = async (req, res) => {
  const { _id } = req.user._id
  const { balance } = req.body

  const newBalance = await User.findByIdAndUpdate(
    _id,
    { balance },
    { new: true }
  )
  res.status(201).json({
    email: newBalance.email,
    balance: newBalance.balance,
  })
}

module.exports = setBalance
