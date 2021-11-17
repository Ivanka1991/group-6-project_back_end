const { User } = require('../../models')
const { sendSuccessResponse } = require('../../helpers')

const googleUser = async (req, res) => {
  const { userEmail } = req.params
  console.log('userEmail', userEmail)
  const user = await User.findOne({ email: userEmail })
  console.log('user', user)
  sendSuccessResponse(res, user, 200)
}

module.exports = googleUser
