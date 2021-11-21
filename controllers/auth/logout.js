const { User } = require('../../models')

const logout = async (req, res) => {
  console.log('logout')
  const { email } = req.user
  await User.findOneAndUpdate({ email }, { token: null })
  res.json({
    status: 'success',
    code: 200,
    message: 'Success logout'
  })
}

module.exports = logout
